const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan_formatted").get(function () {
  if (this.date_of_birth && this.date_of_death) {
    return `Birth: ${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )} - Death: ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else if (this.date_of_birth) {
    return `Birth: ${DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else if (this.date_of_death) {
    return `Death: ${DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    )}`;
  } else {
    return "";
  }
});

AuthorSchema.virtual("date_of_birth_ISO").get(function(){
  if(this.date_of_birth){
    return DateTime.fromJSDate(this.date_of_birth).toISODate()
  }
})

AuthorSchema.virtual("date_of_death_ISO").get(function(){
  if(this.date_of_death){
    return DateTime.fromJSDate(this.date_of_death).toISODate()
  }
})

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
