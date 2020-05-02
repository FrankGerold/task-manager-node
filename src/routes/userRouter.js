const express = require('express')

const User = require('../models/user')

const router = new express.Router()

// userRouter.get('/test', (req, res) => {
//   res.send('from nerw file')
// })

// /////////////////////////////////////////
// User routes

  // app.get('/users', (req, res) => {
  //   User.find({})
  //   .then(users=>res.send(users))
  //   .catch(e => {
  //     res.status(500)
  //     .send(/*e*/)
  //   })
  // })
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500)
    .send(e)
  }
})

// app.get('/users/:id', (req, res) => {
//   let _id = req.params.id
//
//   User.findById(_id)
//   .then(user => {
//     if (!user) {
//       return res.status(404).send('user not found')
//     }
//
//     res.send(user)
//   })
//   .catch(e => res.status(500).send())
// })
router.get('/users/:id', async (req, res) => {
  let id = req.params.id

  try {
    let user = await User.findById(id)

    if (!user) {
      return res.status(404)
      .send('user not found')
    }

    res.send(user)

  } catch (e) {
    res.status(500)
    .send(e)
  }
})

// app.post('/users', (req, res) => {
//   let newUser = new User(req.body)
//
//   newUser.save()
//   .then(() => res.status(201).send(newUser))
//   .catch(e => {
//     res.status(400)
//     .send(e)
//   })
// })
router.post('/users', async (req, res) => {
  let userParams = new User(req.body)

  try {
    let newUser = await userParams.save()
    res.status(201)
    .send(newUser)

  } catch (e) {
    res.status(400)
    .send(e)
  }
})

router.patch('/users/:id', async (req, res) => {
  let id = req.params.id
  let updateParams = req.body

  // validate update fields
  let attemptedUpdates = Object.keys(updateParams)
  const allowedUpdates = ['name', 'email', 'password', 'age']
// every tests if all elements in an array pass the test
  const isValidOperation = attemptedUpdates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400)
    .send({
      error: 'Invalid Update'
    })
  }

  // Attempt to update user
  try {
    // let updatedUser = await User.findByIdAndUpdate(id, updateParams, {
    //   new: true,
    //   runValidators: true
    // })
    // CHange syntax to allow middleware to work with updates
    let updatedUser = await User.findById(id)
    // console.log('USER: ', user)
    //
    // let updatedUser = {
    //   ...user._doc
    // }
    // console.log('UPDATED: ', updatedUser);

    attemptedUpdates.forEach(update => updatedUser[update] = updateParams[update])

    await updatedUser.save()

    if (!updatedUser) {
      return res.status(404)
      .send('user not found')
    }

    res.send(updatedUser)
  } catch (e) {
    res.status(400)
    .send(e)
  }
})

// Delete User
router.delete('/users/:id', async (req, res) => {
  let id = req.params.id

  try {
    let user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).send('user not found')
    }

    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router;
