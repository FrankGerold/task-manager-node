const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Task = require('./task')

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
    trim: true,
    unique: true
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
})


// Virtual Property connecting User to its tasks
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})


// Method for logging in
userSchema.statics.findByCredentials = async (email, password) => {
  // Check DB for given email
  const user = await User.findOne({ email })

  // if not associated with any user, login fails
  if (!user) {
    throw new Error('Unable to log in')
  }

  // After finding user in DB with given email, hash given pawsswird and compare to password in DB.
  const passMatch = await bcrypt.compare(password, user.password)

  // If password doesnt math, login fails
  if (!passMatch) {
    throw new Error('Unable to log in')
  }

  // FInally, if the given password matches the DB, the login succeeds and user in DB is returned
  return user
}


// hash plaintext password before saving
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }

  next()
})


// Delete all tasks when user is deleted
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})


userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'Super Secret Key Alert!')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}


// Filter returned info for security purposes
userSchema.methods.toJSON = function () {
  const user = this

  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}


const User = mongoose.model('User', userSchema)


module.exports = User
