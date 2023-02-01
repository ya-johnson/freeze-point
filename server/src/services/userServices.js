const bcrypt = require('bcrypt')
const { User } = require('../models')
const imageService = require('./imageServices')
const postService = require('./postServices')


const setUserObj = (user, followers) => {
  return {
    id: user._id,
    name: user.name,
    description: user.description || null,
    image: user.image || null,
    following: user.following || null,
    followers
  }
}

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

const getUser = async userId => {
  const user = await getUserById(userId)
  const followers = await User.find({ following: userId })
  return setUserObj(user, followers)
}

const createUser = async userBody => {
  await checkDuplicateEmail(userBody.email)
  userBody.password = await hashPassword(userBody.password)
  const user = await User.create(userBody)
  return user
}

const updateUser = async (userId, updateBody) => {
  const user = await getUserById(userId)

  if (updateBody.email) {
    await checkDuplicateEmail(updateBody.email)
  }

  if (updateBody.image && !user.image.id) {
    const img = await imageService.uploadImg(updateBody.image ,user._id)
    updateBody.image = { id: img.public_id, url: img.secure_url }
  } 
  else if (updateBody.image && user.image.id) {
    await imageService.removeImg(user.image.id)
    const img = await imageService.uploadImg(updateBody.image ,user._id)
    updateBody.image = { id: img.public_id, url: img.secure_url }
  }

  Object.assign(user, updateBody)
  await user.save()
  return user
}

const deleteUser = async userId => {
  const user = await getUserById(userId)
  if (user.image?.id) await imageService.removeImg(user.image?.id)
  await postService.deleteAllUserPosts(userId)
  await user.remove()
}


module.exports = {
  getUserById,
  getUserByEmail,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}