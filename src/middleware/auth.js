const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  // Header: Authorization: bearer token
  try {
    const token = req.header('Authorization').split(" ")[1]
    // or token.replace('Bearer ', '')

    const decoded = jwt.verify(token, 'Super Secret Key Alert!')

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    })

    if (!user) {
      throw new Error()
    }

    // Make this specific token used accessible to request handlers
    req.token = token

    // Return the active user
    req.user = user
    next()
  } catch (e) {
    res.status(401)
    .send({error: "Please authenticate!"})
  }
}

module.exports = auth
