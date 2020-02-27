const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../data/test_helper')

const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'password', password: 'password' })
    await user.save()
  })

  test('new user created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Alex',
      name: 'Alex Dee',
      password: 'password1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
