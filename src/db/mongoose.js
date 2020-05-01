const mongoose = require('mongoose')
const validator = require('validator')

mongoUrl = 'mongodb://localhost:27017/'
dbName = 'task-manager-api'

mongoose.connect(mongoUrl + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const User = mongoose.model('User', {
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
      else if (val.toLowerCase.includes('password')) {
        throw new Error('Password too insecure. Pick a better one.')
      }
    },
    trim: true
  }

})

// const me = new User({
//   name: 'Frankis',
//   age: 29,
//   type: 'fat'
// })
//
// me.save().then(console.log).catch(console.log)

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

// let fight = new Task({title:'Fight',description:'fisticuffs with rando',complete:false})
//
// fight.save().then(console.log).catch(console.log)

// const mig = new User({
//   name: 'Miguel',
//   email: 'mig@guel.net'
// })
//
// mig.save().then(() => {
//   console.log(mig);
// }).catch((err) => {
//   console.log('Error!  ', err);
// })

// new User({
//   name: 'diana',
//   email: 'di@na.com',
//   password: '12334456789'
// }).save()
//
// new User({
//   name: 'pietra',
//   email: 'di.na',
//   password: '12334456789'
// }).save().catch(console.log)
//
// new User({
//   name: 'pietri',
//   email: 'di@f.net',
//   password: '123'
// }).save().catch(console.log)
//
// new User({
//   name: 'dino',
//   email: 'dino@d.com',
//   password: '145654password2213213'
// }).save().catch(console.log)
//
// new User({
//   name: 'Trilby',
//   email: '123@mac.com',
//   password: 'vsbsdhjnkmifuwytghjui8765rfdvbhnj'
// }).save().catch(console.log)

new Task({
  description: '   run outside for a while'
}).save()
