var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');

var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {
  BookInstance.find()
    .populate('book')
    .exec(function(err, list_bookinstances) {
      if(err) { return next(err) }
      res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: list_bookinstances});
    });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res, next) {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err, bookinstance) {
      if(err) { return next(err); }
      if(bookinstance == null) { // no results
        var err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }
      // successful, so render
      res.render('bookinstance_detail', { title: 'Book', bookinstance: bookinstance });
    });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res, next) {
  Book.find({}, 'title')
    .exec(function(err, books) {
      if(err) { return next(err); }
      // Succesful, so render.
      res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books})
    });
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [

  // Validate fields.
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a bookinstance object with escaped and trimmed data.
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back
    });

    if(!errors.isEmpty()) {
      // There are errors. Render again with sanitized values/errors messages.
      Book.find({}, 'title')
        .exec(function(err, books) {
          if(err) { return next(err); }
          //Succesful, so render.
          res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id, bookinstance: bookinstance, errors: errors.array() });
        });
        return;
    }
    else {
      // Data from form is valid.
      bookinstance.save(function(err) {
        if(err) { return next(err); }
        // Succesful - redirect to new record.
        res.redirect(bookinstance.url);
      });
    }
  }
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res, next) {

  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function(err, bookinstance) {
      if(err) { return next(err); }
      if(bookinstance == null) {
        // No results, so there is nothing to delete.
        res.redirect('/catalog/bookinstances');
      }
      // Succesful, so render.
      res.render('bookinstance_delete', { title: 'Delete Book Copy', bookinstance: bookinstance })
  });
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {

  BookInstance.findById(req.body.bookinstanceid, function(err, bookinstance) {
    if(err) { return next(err); }
    // Delete object and redirect to the list of bookinstances.
    BookInstance.findByIdAndRemove(req.body.bookinstanceid, function(err) {
      if(err) { return next(err); }
      // Success - go to bookinstance list.
      res.redirect('/catalog/bookinstances');
    });
  });
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res, next) {

  async.parallel({
    bookinstance: function(callback) {
      BookInstance.findById(req.params.id)
        .populate('book')
        .exec(callback);
    },
    book_list: function(callback) {
      Book.find({}, 'title').exec(callback);
    }
  }, function(err, results) {
    if(err) { return next(err); }
    if(results.bookinstance == null) {
      // No results
      var err = new Error('BookInstance not found');
      err.status = 404;
      return next(err);
    }
    // Success, show bookinstance´s data
    res.render('bookinstance_form', { title: 'Update Book Copy', bookinstance: results.bookinstance, book_list: results.book_list})
  });
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = [

  // Validate fields.
  body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
  body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields.
  sanitizeBody('book').trim().escape(),
  sanitizeBody('imprint').trim().escape(),
  sanitizeBody('status').trim().escape(),
  sanitizeBody('due_back').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a bookinstance object with escaped and trimmed data.
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id
    });

    if(!errors.isEmpty()) {
      // There are errors. Render again with sanitized values/errors messages.
      Book.find({}, 'title')
        .exec(function(err, books) {
          if(err) { return next(err); }
          //Succesful, so render.
          res.render('bookinstance_form', { title: 'Update Book Copy', book_list: books, bookinstance: bookinstance, errors: errors.array() });
        });
        return;
    }
    else {
      BookInstance.findOneAndUpdate({ _id: req.params.id}, bookinstance, {}, function(err, thebookinstance) {
        if(err) { return next(err); }
        // Succesful - redirect to new record.
        res.redirect(bookinstance.url);
      });
    }
  }
];
