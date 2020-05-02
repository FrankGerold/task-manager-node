const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive')
      }
      else if (value >= 150) {
        throw new Error('Youre too old sry')
      }
    },
    required: false,
    default: 0
  },
  email: {
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('Must be a valid email!')
      }
    },
    required: true,
    trim: true
  },
  password: {
    required: true,
    type: String,
    validate(val) {
      if (val.length <= 6) {
        throw new Error('Password must be at least 7 characters long')
      }
      // forgot case insensitivity!
      else if (val.toLowerCase().includes('password')) {
        throw new Error('Password too insecure. Pick a better one.')
      }
    },
    trim: true
  }
})

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
