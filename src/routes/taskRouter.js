const express = require('express')

const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

// Task routes

// User's Task List
  // GET /tasks?complete=true  sorts results by completion
  // GET /tasks?limit=10&skip=20  pagination
  // GET /tasks?sortBy=createdAt_asc / createdAt_desc
router.get('/tasks', auth, async (req, res) => {

  let sort = {}

  // Match query to filter result by complete boolean
  // TODO: optimize this later
  let match = {}
  if (req.query.complete) {
    match.complete = req.query.complete === "true"
  }

  // Sorting query to determine order of results
  if (req.query.sortBy) {
    let sortValues = req.query.sortBy.split('_')
    sort[sortValues[0]] = sortValues[1] === 'asc' ? 1 : -1
  }

  try {
    let user = req.user
    await user.populate({
      path: 'tasks',
      match,
      options: {
        // Limit query determines how many results per page
        limit: parseInt(req.query.limit),
        
        // Skip query determines which 'page' to return
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()

    let tasks = user.tasks

    res.send(tasks)
  } catch (e) {
    res.status(500)
    .send(e)
  }
})
// router.get('/tasks', async (req, res) => {
//   try {
//     let tasks = await Task.find({})
//
//     res.send(tasks)
//   } catch (e) {
//     res.status(500)
//     .send(e)
//   }
// })
// app.get('/tasks', (req, res) => {
//   Task.find({})
//   .then(tasks=>res.send(tasks))
//   .catch(e=>res.status(500).send(e))
// })

// Get specific task
router.get('/tasks/:id', auth, async (req, res) => {
  let _id = req.params.id

  try {
    // let task = await Task.findById(id)
    let task = await Task.findOne({ _id, owner: req.user._id})

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

// Create a Task
router.post('/tasks', auth, async (req, res) => {
  // let taskParams = new Task(req.body)
  let taskParams = new Task({
    ...req.body,
    owner: req.user._id
  })
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
router.patch('/tasks/:id', auth, async (req, res) => {
  let _id = req.params.id
  let owner = req.user._id
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
    let task = await Task.findOne({ _id, owner})

    if (!task) {
      return res.status(404).send('Task not found')
    }

    updates.forEach(update => task[update] = taskUpdate[update])

    await task.save()

    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

// Delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
  // Grab desired task ID from uri params
  let _id = req.params.id
  let owner = req.user._id

  try {
    // Find the task owned by currrent user
    let task = await Task.findOne({_id, owner})

    // If DB search doesnt find given task, return an error message
    if (!task) {
      return res.status(404).send('Task not found...')
    }

    // Delete the task
    await task.remove()

    // Send back the deleted task if successfully removed from DB
    res.send(task)
  } catch (e) {
    // Send a server error message if a backend issue prevents the
    // operation
    res.status(500).send(e)
  }
})
// router.delete('/tasks/:id', async (req, res) => {
//   // Grab desired task ID from uri params
//   let taskId = req.params.id
//
//   try {
//     // Try to delete the task
//     let task = await Task.findByIdAndDelete(taskId)
//
//     // If DB search doesnt find given task, return an error message
//     if (!task) {
//       return res.status(404).send('Task not found...')
//     }
//
//     // Send back the deleted task if successfully removed from DB
//     res.send(task)
//   } catch (e) {
//     // Send a server error message if a backend issue prevents the
//     // operation
//     res.status(500).send(e)
//   }
// })

////////////////////////////////////////////////////////////
// Dev routes


///////////////////////////////////////////////////////////////

module.exports = router;
