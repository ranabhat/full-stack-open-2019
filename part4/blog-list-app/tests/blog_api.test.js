const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

/* Set up */
beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

/* Test */
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is key id in a blog object', async () => {
  const response = await api.get('/api/blogs')
  const keys = response.body.map(items => Object.keys(items))
  const foundId = keys[0].find(key => key === 'id')
  // console.log('key', keys[0])
  // console.log('foundId', foundId)
  expect(foundId).toBeDefined

})

test('there are two blogs', async () => {

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(2)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: '12 rules of life',
    author: 'Jordan B. Peterson',
    url: 'ww.jb.com',
    likes: 3,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(contents).toContain('12 rules of life')
})
test('a blog without likes properties will add likes property with zero value', async () => {
  const newBlog = {
    title: '12 rules of life',
    author: 'Jordan B. Peterson',
    url: 'ww.jb.com',

  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(contents).toContain('12 rules of life')
})

test('blog without title and url properties', async () => {
  const newBlog = {
    author: 'Peter Anderson',
    likes: 2,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()


})