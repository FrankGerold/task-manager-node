const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../../src/models/user')
const Task = require('../../src/models/task')



let user1Id = new mongoose.Types.ObjectId()
let user1 = {
  name: 'Fran',
  email: 'fran@email.net',
  password: '1234567',
  _id: user1Id,
  tokens: [{
    token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET)
  }]
}

let user2Id = new mongoose.Types.ObjectId()
let user2 = {
  name: 'Trill',
  email: '111@111.com',
  password: '1111111',
  _id: user2Id,
  tokens: [{
    token: jwt.sign({ _id: user2Id }, process.env.JWT_SECRET)
  }]
}

let task1 = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Task One',
  description: 'First test task',
  completed: 'false',
  owner: user1Id
}

let task2 = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Task Two',
  description: 'Second test task',
  completed: 'false',
  owner: user2Id
}

let task3 = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Task Three',
  description: 'third test task',
  completed: 'false',
  owner: user1Id
}

const configDb = async () => {
  await User.deleteMany()
  await Task.deleteMany()

  await new User(user1).save()
  await new User(user2).save()

  await new Task(task1).save()
  await new Task(task2).save()
  await new Task(task3).save()

}

module.exports = {
  user1,
  user1Id,
  user2Id,
  user2,
  task1,
  task2,
  task3,
  configDb
};
