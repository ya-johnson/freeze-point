const { asyncHandler } = require('../utils')
const { userService } = require('../services')
const validate = require('../validations/validate')


const getUsers = asyncHandler( async (req, res) => {
  const users = await userService.getUsers()
  res.status(200).json(users)
})

const getUser = asyncHandler( async (req, res) => {
  const { userId } = req.params
  const user = await userService.getUser(userId)
  res.status(200).json(user)
})

const createUser = asyncHandler( async (req, res) => {
  validate.register(req.body)
  const user = await userService.createUser(req.body)
  res.status(200).json(user)
})

const updateUser = asyncHandler( async (req, res) => {
  const { userId } = req.params
  if (userId !== req.userId) return
  const user = await userService.updateUser(userId, req.body)
  res.status(200).json(user)
})

const deleteUser = asyncHandler( async (req, res) => {
  const user = await userService.deleteUser(req.userId)
  res.status(200).json('User Deleted')
})


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}