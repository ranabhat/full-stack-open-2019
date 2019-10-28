const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }

    // const user = await User.findById(body.userId)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
    // try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog && (user.id.toString() === blog.user.toString() )) {

      //try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else if (!blog || !user) {
      response.status(400).json({ error: 'already deleted or malformat blog id' })
    }
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blogs = await Blog.findById(request.params.id)
    //const blogForWhomLikeToUpdate = blogs.filter(blog => blog.id === request.params.id)
    const previousLikesFromBlog = blogs.likes
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: previousLikesFromBlog + 1,
      user: user._id
    }
    //const blogs = await Blog.find({})
    // const blogForWhomLikeToUpdate = blogs.filter(blog => blog.id === request.params.id)
    // const previousLikesFromBlog = blogForWhomLikeToUpdate[0].likes
    // const blog = {
    //   likes: body.likes + previousLikesFromBlog
    // }
    // try {
    if (blog && (user.id.toString() === blog.user.toString() )) {

      const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(blogToUpdate.toJSON())
    } else if (!blog || !user) {
      response.status(400).json({ error: 'already deleted or malformat blog id' })
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter