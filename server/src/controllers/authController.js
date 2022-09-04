const { asyncHandler } = require('../utils')
const { userService, authService } = require('../services')
const validate = require('../validations/validate')


const register = asyncHandler( async (req, res) => {
  validate.register(req.body)
  const user = await userService.createUser(req.body)
  const token = await authService.generateToken(user._id)
  const response = { user, token }
  res.status(200).json(response)
})

const login = asyncHandler( async (req, res) => {
  validate.login(req.body)
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