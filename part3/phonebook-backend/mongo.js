const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://dbbronepeace:${password}@cluster0-dqgmp.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length===3) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
      mongoose.connection.close()
    })
  })
}
else if (process.argv.length===5) {
  const contact = new Contact({
    name: `${name}`,
    number: `${number}`

  })


  contact.save().then(result => {
    console.log('contact saved!')
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
else if (process.argv.length===4){
  console.log('Not provided phone number')
  mongoose.connection.close()
}
else {
  console.log('Unnecessary parameters provided; Only required password, name and number')
  mongoose.connection.close()
}