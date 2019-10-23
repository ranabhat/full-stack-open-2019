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
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })
  try {
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
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  const body = request.body
  const blogs = await Blog.find({})
  const blogForWhomLikeToUpdate = blogs.filter(blog => blog.id === request.params.id)
  const previousLikesFromBlog = blogForWhomLikeToUpdate[0].likes
  const blog = {
    likes: body.likes + previousLikesFromBlog
  }
  try {
    const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blogToUpdate.toJSON())
  // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //   .then(updatedBlog => {
  //     console.log('updatedBlog', updatedBlog)
  //     response.json(updatedBlog.toJSON())
  //   })
  //   .catch(error => next(error))
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter