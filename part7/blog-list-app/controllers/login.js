const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  // searching user from the database by the username attached to the request
  const user = await User.findOne({ username: body.username })

  // searching for the password and checking if password is correct
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // token is created with medthod jwt.sign that contains username and the user id in digital signed form
  const token = jwt.sign(userForToken, process.env.SECRET) // specify SECRET in .env file

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter