const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Elements of AI',
    author: 'Henry Cavil',
    url: 'ww.notexample.com',
    likes: 1
  },
  {
    title: 'React and Node JS',
    author: 'John Doe',
    url: 'ww.example.com',
    likes: 4
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }