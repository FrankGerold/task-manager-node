const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')
const { user1, user1Id, configDb } = require('./fixtures/db')


beforeEach(configDb)


test('Should sign up new user', async () => {
  let response = await request(app).post('/users').send({
    name: 'Andrew',
    email: 'drew@emil.com',
    password: 'mypass123'
  }).expect(201)


  // Assert DB was changed
  let user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about response
  // expect(response.body.user.name).toBe('Andrew')
  expect(response.body).toMatchObject({
    user: {
      name: 'Andrew',
      email: 'drew@emil.com'
    },
    token: user.tokens[0].token
  })

  expect (user.password).not.toBe('mypass123')
})


test('Should log in existing user', async () => {
  let response = await request(app).post('/users/login').send({
    email: user1.email,
    password: user1.password
  }).expect(200)

  let user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()
  expect(user.tokens[1].token).toBe(response.body.token)
})


test('should fail to login fake user', async () => {
  await request(app).post('/users/login').send({
    email: 'user@rmail.com',
    password: '123123123'
  }).expect(400)
})


test('Get user profile', async () => {
  await request(app).get('/users/me')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .send()
  .expect(200)
})


test('Should fail to retrieve unauthenticated user profile', async () => {
  await request(app).get('/users/me')
  .send()
  .expect(401)
})


test('Should delete user account', async () => {
  await request(app).delete('/users/me')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .send()
  .expect(200)

  // Make sure user no longer in DB
  let user = await User.findById(user1Id)

  expect(user).toBeNull()
})


test('Should fail to delete unauthenticated account', async () => {
  await request(app).delete('/users/me')
  .send()
  .expect(401)
})


test('Should upload avatar image', async () => {
  await request(app).post('/users/me/avatar')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .attach('avatar', 'test/fixtures/profile-pic.jpg')
  .expect(200)

  let user = await(User.findById(user1Id))
  expect(user.avatar).toEqual(expect.any(Buffer))
})


test('Should update user fields', async () => {
  await request(app).patch('/users/me')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .send({
    name: 'Frank',
    age: 40
  })
  .expect(200)

  let user = await(User.findById(user1Id))
  expect(user.age).toEqual(40)
})


test('Should not update invalid fields', async () => {
  await request(app).patch('/users/me')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .send({
    location: 'New York'
  })
  .expect(400)
})
