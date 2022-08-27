const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret } = require('../config')
const userService = require('../services/userServices')


const generateToken = async (userId) => {
  return jwt.sign({userId}, secret, { expiresIn: '3d' })
}

const verifyToken = async (token) => {
  if (!token) {
    throw Error('Authentication token required')
  }
  
  const userId = jwt.verify(token, secret)
  return userId
}

const checkPassword = async (password, userPassword) => {
  const match = await bcrypt.compare(password, userPassword)

  if (!match) {
    throw Error('Passwords not match')
  }
}

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  await checkPassword(password, user.password)
  return user
}

module.exports = {
  generateToken,
  verifyToken,
  checkPassword,
  login
}