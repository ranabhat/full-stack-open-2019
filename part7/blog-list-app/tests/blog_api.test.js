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
describe('when there are some initial blogs saved', () => {
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
  /* Get all blogs test */
  test('there are two blogs', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(2)
  })
})

/* If there doesn't exist blog return 404 error */
describe('viewing not available when error', () => {

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    //console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })
})

/* When added valid test*/
describe('addition of a new blog', () => {
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
  /* When inserted invalid blog */
  test('blog without title and url properties returns 400 ', async () => {
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
})


/* When occurs Note Deletion */
describe('deletion of a new blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtBeginning = await helper.blogsInDb()
    const blogToDelete = blogsAtBeginning[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
    expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const blogContents = blogsAtEnd.map(r => r.title)

    expect(blogContents).not.toContain(blogToDelete.title)

  })
})


/* When a blog is updated test*/
describe('updating a valid blog adds likes', () => {
  test('a valid blog can be updated', async () => {
    const blogsAtBeginning = await helper.blogsInDb()
    let blogToUpdate = blogsAtBeginning[0]
    const blogiToUpdate = {
      likes: 5
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogiToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const resultBlog = await helper.blogsInDb()
    expect(resultBlog[0].likes).toBe(6)

  })
})

afterAll(() => {
  mongoose.connection.close()


})