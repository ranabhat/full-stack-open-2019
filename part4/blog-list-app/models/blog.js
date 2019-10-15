const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator') // plugin which adds pre-save validation for unique fields within a Mongoose schema.
mongoose.set('useFindAndModify', false)
//mongoose.set('useCreateIndex', true)

const blogSchema = new mongoose.Schema({
  title: { type: String }, //, minlength: 3, required: true, unique: true , uniqueCaseInsensitive: true },
  author: { type: String }, //, required: true, validate: /^\d{3}-\d{3}-\d{2}\d*$/ }
  url: { type: String },
  likes: { type: Number }
})

// Apply the uniqueValidator plugin to userSchema to guarantee unique name
//blogSchema.plugin(uniqueValidator)


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)