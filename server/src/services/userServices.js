const bcrypt = require('bcrypt')
const { User } = require('../models')
const { updateMany } = require('../models/postModel')
const imageService = require('./ImageServices')


const checkDuplicateEmail = async email => {
  const user = await User.findOne({ email }).exec()
  if (user) {
    throw Error('Email alreay exists')
  }
}

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const getUserById = async userId => {
  const user = await User.findById(userId)

  if (!user) {
    throw Error('User not found')
  }
  return user
}

const getUserByEmail = async email => {
  const user = await User.findOne({ email })

  if (!user) {
    throw Error('No user with that Email')
  }
  return user
}

const getUsers = async () => {
  const users = await User.find()
  return users
}

const getUser = async (userId) => {
  const user = await getUserById(userId)
  return user
}

const createUser = async userBody => {
  await checkDuplicateEmail(userBody.email)
  userBody.password = await hashPassword(userBody.password)
  const user = await User.create(userBody)
  return user
}

const updateUser = async (updateBody) => {
  const user = await getUserById(updateBody.userId)

  if (updateBody.email) {
    await checkDuplicateEmail(updateBody.email)
  }

  if (updateBody.image) {
    const img = await imageService.uploadImg(updateBody.image ,user._id)
    updateBody.image = img.secure_url
  }

  Object.assign(user, updateBody)
  await user.save()
  return user
}

const deleteUser = async userId => {
  const user = await getUserById(userId)
  await user.remove()
  return user
}


module.exports = {
  getUserById,
  getUserByEmail,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}