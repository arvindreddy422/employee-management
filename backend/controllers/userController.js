const prisma = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { z } = require('zod')

const inputValidate = z.object({
  username: z.string(),
  password: z.string(),
})

exports.signin = async (req, res) => {
  const { username, password } = req.body
  try {
    const isValidInput = inputValidate.safeParse({ username, password })
    if (!isValidInput.success) {
      return res.json({
        success: false,
        message: 'Invalid input',
      })
    }

    const user = await prisma.t_login.findFirst({
      where: {
        f_userName: username,
      },
    })
    if (!user) {
      return res.json({
        success: false,
        message: 'User not exist',
      })
    }
    const isValidPass = await bcrypt.compare(password, user.f_Pwd)
    if (!isValidPass) {
      return res.json({
        success: false,
        message: 'Invalid Crediantials',
      })
    }
    const token = jwt.sign(user.f_id, process.env.JWT_SECTET)

    return res.json({
      success: true,
      user: { username, token },
    })
  } catch (e) {
    console.log(e.message)
    return req.json({
      success: false,
      message: e.message,
    })
  }
}

exports.signup = async (req, res) => {
  const { username, password } = req.body
  try {
    const isValidInput = inputValidate.safeParse({ username, password })
    if (!isValidInput.success) {
      return res.json({
        success: false,
        message: 'Invalid input',
      })
    }
    const existUser = await prisma.t_login.findFirst({
      where: {
        f_userName: username,
      },
    })
    if (existUser) {
      return res.json({
        success: false,
        message: 'Username already exist',
      })
    }
    const encPass = await bcrypt.hash(password, 10)
    const user = await prisma.t_login.create({
      data: {
        f_userName: username,
        f_Pwd: encPass,
      },
    })

    const token = jwt.sign(user.f_id, process.env.JWT_SECTET)

    return res.json({
      success: true,
      user: { username, token },
    })
  } catch (e) {
    console.log(e.message)
    return res.json({
      success: false,
      message: e.message,
    })
  }
}
