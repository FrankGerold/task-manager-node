const express = require('express')

// ensure file runs and mongoose connects to db
require('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
})

// const main = async () => {
//   // const task = await Task.findById('5eaf1c062355e912cd60f8b3')
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner);
//
//   const user = await User.findById("5eaf047d4e7f830f146792f4")
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks);
//
// }
// main()
