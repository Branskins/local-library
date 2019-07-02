var mongoose = require('mongoose');
var moment = require('moment');

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
  return (this.date_death.getFullYear() - this.date_birth.getFullYear()).toString();
});

// virtual for author's url
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

// virtual for author's formatted date of birth
AuthorSchema.virtual('date_birth_formatted').get(function() {
  var dateWrapper = moment(this.date_birth);
  return dateWrapper.format('dddd, MMMM Do, YYYY');
})

// virtual for author's formatted date of death
AuthorSchema.virtual('date_death_formatted').get(function() {
  var dateWrapper = moment(this.date_death);
  return dateWrapper.format('dddd, MMMM Do, YYYY');
})

// export model
module.exports = mongoose.model('Author', AuthorSchema);
