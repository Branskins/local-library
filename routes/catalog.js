var express = require('express');
var router = express.Router;

// require controller module
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var bookinstance_controller = require('../controllers/bookinstanceController');

// GET catalog home page
router.get('/', book_controller.index);

/// BOOK ROUTES ///

// GET request for creating a Book. NOTE: This must come before routes that display Book (uses id)
router.get('/book/create', book_controller.book_create_get);

// POST request for creating Book
router.post('/book/create', book_controller.book_create_post);

// GET request to delete Book
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST request to delete Book
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET request to update Book
router.get('/book/:id/update', book_controller.book_update_get);

// POST request to update Book
router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one Book
router.get('/book/:id', book_controller.book_detail);

// GET request for list all Book items
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///

// GET request for creating an Author. NOTE: This must come before routes that display Author (uses id)
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author
router.post('/author/create', author_controller.author_create_post);

// GET request to delete Author
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author
router.get('/author/:id', author_controller.author_detail);

// GET request for list all Author items
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE: This must come before routes that display Genre (uses id)
router.get('/genre/create', genre_controller.genre_create_get);

// POST request for creating Genre
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list all Genre items
router.get('/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE: This must come before routes that display BookInstance (uses id)
router.get('/genre/create', genre_controller.genre_create_get);

// POST request for creating BookInstance
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete BookInstance
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete BookInstance
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update BookInstance
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update BookInstance
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one BookInstance
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list all BookInstance items
router.get('/genres', genre_controller.genre_list);

module.exports = router;
