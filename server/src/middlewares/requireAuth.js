const authService = require('../services/authServices')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization.split(' ')[1]

  try {
    const payload = await authService.verifyToken(token)
    req.userId = payload.userId
    next()
  } 
  catch(err) {
    res.status(401).json({error: err})
  }
}

module.exports = requireAuth