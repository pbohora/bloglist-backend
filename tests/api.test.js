const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../data/test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = helper.blogs.map(blog => new Blog(blog))
  const promiseArrary = blogObject.map(blog => blog.save())
  await Promise.all(promiseArrary)
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return all blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.blogs.length)
})

test('id defined for blog post', async () => {
  const newBlog = {
    title: 'Javascript algorithm',
    author: 'Annika',
    url: 'https://algorithm.com',
    likes: 100
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.id).toBeDefined()
})

test('new blog is created', async () => {
  const newBlog = {
    title: 'Javascript algorithm part 2',
    author: 'Annika lappa',
    url: 'https://algorithm.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogAtEnd = await helper.blogInDb()

  expect(blogAtEnd.length).toBe(helper.blogs.length + 1)

  const author = blogAtEnd.map(blog => blog.author)
  expect(author).toContain('Annika lappa')
})

test('returned zero likes if no likes is provided in body', async () => {
  const newBlog = {
    title: 'Javascript algorithm part 2',
    author: 'Annika lappa',
    url: 'https://algorithm.com'
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toEqual(0)
})

test('title and url should be included', async () => {
  const newBlog = {
    author: 'Annika lappa'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog id deleted', async () => {
  const blogsAtStart = await helper.blogInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
})

test('blog likes is updated', async () => {
  const blogs = await helper.blogInDb()
  const blogToUpdate = blogs[0]
  const blog = {
    likes: 12
  }

  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blog)
  expect(response.body.likes).toEqual(blog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
