var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, required: true, maxlength: 100, minlength: 3 }
});

// virtual for genre's url
GenreSchema.virtual('url').get(function () {
  return '/catalog/genre/' + this._id;
});

// export model
module.export = mongoose.model('Genre', GenreSchema);
