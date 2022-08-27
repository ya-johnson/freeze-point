const asyncHandler = require('../utils/asyncHandler')
const { userService, authService } = require('../services')
const validateUser = require('../validations/validateUser')


const register = asyncHandler( async (req, res) => {
  validateUser(req.body)
  const user = await userService.createUser(req.body)
  const token = await authService.generateToken(user._id)
  const response = { user, token }
  res.status(200).json(response)
})

const login = asyncHandler( async (req, res) => {
  const user = await authService.login(req.body.email, req.body.password)
  const token = await authService.generateToken(user._id)
  const response = { user, token }
  res.status(200).json(response)
})

// forgotPassword


// resetPassword


module.exports = {
  register,
  login,
}