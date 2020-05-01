const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  title: {
    type: String,
    trim: true,
    required: false
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  complete: {
    type: Boolean,
    required: false,
    default: false
  }
})


module.exports = Task
