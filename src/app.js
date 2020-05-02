const express = require('express')

// ensure file runs and mongoose connects to db
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3002

app.use(express.json())

// /////////////////////////////////////////
// User routes

  // app.get('/users', (req, res) => {
  //   User.find({})
  //   .then(users=>res.send(users))
  //   .catch(e => {
  //     res.status(500)
  //     .send(/*e*/)
  //   })
  // })
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500)
    .send(e)
  }
})

// app.get('/users/:id', (req, res) => {
//   let _id = req.params.id
//
//   User.findById(_id)
//   .then(user => {
//     if (!user) {
//       return res.status(404).send('user not found')
//     }
//
//     res.send(user)
//   })
//   .catch(e => res.status(500).send())
// })
app.get('/users/:id', async (req, res) => {
  let id = req.params.id

  try {
    let user = await User.findById(id)

    if (!user) {
      return res.status(404)
      .send('user not found')
    }

    res.send(user)

  } catch (e) {
    res.status(500)
    .send(e)
  }
})

// app.post('/users', (req, res) => {
//   let newUser = new User(req.body)
//
//   newUser.save()
//   .then(() => res.status(201).send(newUser))
//   .catch(e => {
//     res.status(400)
//     .send(e)
//   })
// })
app.post('/users', async (req, res) => {
  let userParams = new User(req.body)

  try {
    let newUser = await userParams.save()
    res.status(201)
    .send(newUser)

  } catch (e) {
    res.status(400)
    .send(e)
  }
})

app.patch('/users/:id', async (req, res) => {
  let id = req.params.id
  let updateParams = req.body

  // validate update fields
  let attemptedUpdates = Object.keys(updateParams)
  const allowedUpdates = ['name', 'email', 'password', 'age']
// every tests if all elements in an array pass the test
  const isValidOperation = attemptedUpdates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400)
    .send({
      error: 'Invalid Update'
    })
  }

  // Attempt to update user
  try {
    let updatedUser = await User.findByIdAndUpdate(id, updateParams, {
      new: true,
      runValidators: true
    })

    if (!updatedUser) {
      return res.status(404)
      .send('user not found')
    }

    res.send(updatedUser)
  } catch (e) {
    res.status(400)
    .send(e)
  }
})

/***************************************************/

// Task routes

app.get('/tasks', async (req, res) => {
  try {
    let tasks = await Task.find({})

    res.send(tasks)
  } catch (e) {
    res.status(500)
    .send(e)
  }
})
// app.get('/tasks', (req, res) => {
//   Task.find({})
//   .then(tasks=>res.send(tasks))
//   .catch(e=>res.status(500).send(e))
// })

app.get('/tasks/:id', async (req, res) => {
  let id = req.params.id

  try {
    let task = await Task.findById(id)

    if (!task) {
      return res.status(404).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(500)
    .send(e)
  }
})
// app.get('/tasks/:id', (req, res) => {
//   let id = req.params.id
//   Task.findById(id)
//   .then(task => {
//     if (!task) {
//       return res.status(404).send('Task not found')
//     }
//
//     res.send(task)
//   })
//   .catch(e=>res.status(500).send(e))
// })

app.post('/tasks', async (req, res) => {
  let taskParams = new Task(req.body)
  try {
    let newTask = await taskParams.save()

    res.status(201)
    .send(newTask)
  } catch (e) {
    res.status(400)
    .send(e)
  }
})
// app.post('/tasks', (req, res) => {
//   new Task(req.body)
//   .save()
//   .then(task=>res.status(201).send(task))
//   .catch(e => {
//     res.status(400)
//     .send(e)
//   })
// })

// Update Task
app.patch('/tasks/:id', async (req, res) => {
  let id = req.params.id
  let taskUpdate = req.body

  // Param Validation:
  const allowedUpdates = ['title', 'description', 'complete']
  let updates = Object.keys(taskUpdate)

  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400)
    .send('Invalid task updates')
  }

  try {
    let task = await Task.findByIdAndUpdate(id, taskUpdate, {new: true, runValidators: true})

    if (!task) {
      return res.status(404).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})


app.listen(port, () => {
  console.log(`Server running on ${port}!`);
})
