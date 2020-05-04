const request = require('supertest')

const app = require('../src/app')

test('Should sign up new user', async () => {
  await request(app).post('/users').send({
    name: 'Andrew',
    email: 'drew@emil.com',
    password: 'mypass123'
  }).expect(201)
})
