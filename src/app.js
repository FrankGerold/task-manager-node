const express = require('express')

// ensure file runs and mongoose connects to db
require('./db/mongoose')

const Task = require('./models/task')

const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')

const app = express()

const port = process.env.PORT || 3002

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
})
