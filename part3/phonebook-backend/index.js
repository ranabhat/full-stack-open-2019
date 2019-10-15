require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

let persons = [
  {
    'name': 'Arto Hellas',
    'number': '040-123456',
    'id': 1
  },
  {
    'name': 'Ada Lovelace',
    'number': '39-44-5323523',
    'id': 2
  },
  {
    'name': 'Dan Abramov',
    'number': '12-43-234345',
    'id': 3
  },
  {
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122',
    'id': 4
  }
]
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('post-body', function(request) { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))

app.get('/', (request, response) => {
  response.send('<h1>Backend-PhoneBook</h1>')
})

app.get('/info', (request, response) => {
  const numberOfPerson = persons.length
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${numberOfPerson} people</p> 
        <p>${date}</p>`)
})

app.get('/api/persons', (request, response) => {
  //response.json(persons)
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    //     console.log(error.message)
    //     response.status(400).send({ error: 'malformatted id' })
    // })
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  // response.status(204).end()
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateId = () => {
//     const maxId = persons.length >= 4
//        // ? Math.max(...persons.map(n => n.id))
//        // ? Math.floor(Math.random() * Math.floor(1000))
//         ? Math.ceil((Math.random() * (10000 - 5) + 5)) // where max is 1000 min is 4
//         : 0
//    // console.log(maxId)
//     return maxId
// }

app.put('/api/persons/:id', (request, response) => {
  const body = request.body
  //console.log(request.params.id)

  const person = {
    name: body.name,
    number: body.number,
  }
  // { new: true } parameter,  will cause our event handler to be called with the new modified document instead of the original.
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatePerson => {
      response.json(updatePerson.toJSON())
    })

})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  //console.log(body)
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const personObject = new Person({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })
  // console.log('person', personObject)
  //const findDuplicate = persons.filter(person => person.name.toLowerCase() === personObject.name.toLowerCase())
  // console.log('findDuplicate', findDuplicate)
  // if (findDuplicate.length === 1) {
  //     return response.status(400).json({ error: 'name must be unique' })
  // }
  // else {
  // persons = persons.concat(personObject)
  // response.json(personObject)
  //}

  personObject.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedFormattedPerson => {
      response.json(savedFormattedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

//handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})