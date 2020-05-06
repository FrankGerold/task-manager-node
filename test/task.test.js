const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task.js')
const {
  user1Id,
  user1,
  configDb,
  user2,
  user2Id,
  task1,
  task2,
  task3
} = require('./fixtures/db')

beforeEach(configDb)

test('Should create a task for user', async () => {
  let response = await request(app).post('/tasks')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .send({
    description: 'Test task!'
  })
  .expect(201)

  let task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.complete).toEqual(false)
})


test('Should get all the tasks for user', async () => {
  let response = await request(app).get('/tasks')
  .set('Authorization', `Bearer ${user1.tokens[0].token}`)
  .send()
  .expect(200)

  expect(response.body.length).toEqual(2)
})

test('Make sure user can only delete their own task', async () => {
  await request(app).delete(`/tasks/${task3._id}`)
  .set('Authorization', `Bearer ${user2.tokens[0].token}`)
  .send()
  .expect(404)

  let task = await Task.findById(task3._id)
  expect(task).not.toBeNull()
  expect(task.complete).toEqual(false)
})
