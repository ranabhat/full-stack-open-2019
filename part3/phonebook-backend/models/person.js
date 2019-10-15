const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // plugin which adds pre-save validation for unique fields within a Mongoose schema.
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true , uniqueCaseInsensitive: true },
  number: { type: String, required: true, validate: /^\d{3}-\d{3}-\d{2}\d*$/ }
})

// Apply the uniqueValidator plugin to userSchema to guarantee unique name
contactSchema.plugin(uniqueValidator)


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)