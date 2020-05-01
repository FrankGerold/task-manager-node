const express = require('express')

// ensure file runs and mongoose connects to db
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3002

app.use(express.json())

app.post('/users', (req, res) => {
  let newUser = new User(req.body)

  newUser.save()
  .then(() => res.send(newUser))
  .catch(e => {
    res.status(400)
    .send(e)
  })
})

app.post('/tasks', (req, res) => {
  new Task(req.body)
  .save()
  .then(res.send)
  .catch(e => {
    res.status(400)
    .send(e)
  })
})

app.listen(port, () => {
  console.log(`Server running on ${port}!`);
})
