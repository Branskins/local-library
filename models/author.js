var mongoose = require('mongoose');

// schema definition
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_birth: { type: Date },
  date_death: { type: Date }
});

// virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  return this.first_name + ', ' + this.family_name;
});

// virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  return (this.date_death.getYear() - this.date_birth.getYear()).toString();
});

// virtual for author's url
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

// export model
module.export = mongoose.model('Author', AuthorSchema);
