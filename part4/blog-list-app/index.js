require('dotenv').config()
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const Note = require('./models/note')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})