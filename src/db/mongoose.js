const mongoose = require('mongoose')

mongoUrl = process.env.MONGODB_URL
dbName = process.env.DB_NAME

mongoose.connect(mongoUrl + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})



// const me = new User({
//   name: 'Frankis',
//   age: 29,
//   type: 'fat'
// })
//
// me.save().then(console.log).catch(console.log)

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

// new Task({
//   description: '   run outside for a while'
// }).save()
