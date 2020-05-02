const express = require('express')

// ensure file runs and mongoose connects to db
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3002

app.use(express.json())

app.get('/users', (req, res) => {
  User.find({})
  .then(users=>res.send(users))
  .catch(e => {
    res.status(500)
    .send(/*e*/)
  })
})

app.get('/users/:id', (req, res) => {
  let _id = req.params.id

  User.findById(_id)
  .then(user => {
    if (!user) {
      return res.status(404).send('user not found')
    }

    res.send(user)
  })
  .catch(e => res.status(500).send())
})

app.post('/users', (req, res) => {
  let newUser = new User(req.body)

  newUser.save()
  .then(() => res.status(201).send(newUser))
  .catch(e => {
    res.status(400)
    .send(e)
  })
})

app.get('/tasks', (req, res) => {
  Task.find({})
  .then(tasks=>res.send(tasks))
  .catch(e=>res.status(500).send(e))
})

app.get('/tasks/:id', (req, res) => {
  let id = req.params.id
  Task.findById(id)
  .then(task => {
    if (!task) {
      return res.status(404).send('Task not found')
    }

    res.send(task)
  })
  .catch(e=>res.status(500).send(e))
})

app.post('/tasks', (req, res) => {
  new Task(req.body)
  .save()
  .then(task=>res.status(201).send(task))
  .catch(e => {
    res.status(400)
    .send(e)
  })
})

app.listen(port, () => {
  console.log(`Server running on ${port}!`);
})
