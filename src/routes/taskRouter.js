const express = require('express')

const Task = require('../models/task')

const router = new express.Router()

// Task routes

router.get('/tasks', async (req, res) => {
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

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
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
    // let task = await Task.findByIdAndUpdate(id, taskUpdate, {new: true, runValidators: true})
    let task = await Task.findById(id)

    updates.forEach(update => task[update] = taskUpdate[update])

    await task.save()

    if (!task) {
      return res.status(404).send('Task not found')
    }

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
  // Grab desired task ID from uri params
  let taskId = req.params.id

  try {
    // Try to delete the task
    let task = await Task.findByIdAndDelete(taskId)

    // If DB search doesnt find given task, return an error message
    if (!task) {
      return res.status(404).send('Task not found...')
    }

    // Send back the deleted task if successfully removed from DB
    res.send(task)
  } catch (e) {
    // Send a server error message if a backend issue prevents the
    // operation
    res.status(500).send(e)
  }
})

module.exports = router;
