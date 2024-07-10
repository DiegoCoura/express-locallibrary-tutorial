const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: { type: String, maxLength: 300, minLength: 3, required: true}
})

GenreSchema.virtual('url').get(function(){
    return `/catalog/genre/${this._id}`
})

module.exports = mongoose.model('Genre', GenreSchema)