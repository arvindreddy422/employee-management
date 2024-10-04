const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')
    jwt.verify(token, process.env.JWT_SECTET)

    return next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Unauthorized',
    })
  }
}
