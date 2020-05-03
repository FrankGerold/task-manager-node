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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

module.exports = Task
