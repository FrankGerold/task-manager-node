const express = require('express')

// ensure file runs and mongoose connects to db
require('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app;
