const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Route Handler that returns all the users in the database
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users.map(u => u.toJSON()))
})

// Route Hamdler for creating new users
usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (body.password === undefined || body.password.length < 4) {
      return response.status(400).json({ error: 'password is empty or must be atleast 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter