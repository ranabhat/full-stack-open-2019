const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })
  try {
    const savedBlog = await blog.save()
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