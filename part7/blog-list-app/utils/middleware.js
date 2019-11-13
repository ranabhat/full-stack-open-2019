const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  // console.log('header', request.header)
  // console.log('autho', request.get('authorization'))
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token =  authorization.substring(7)
    request.token = token
  } else if(!authorization) {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}