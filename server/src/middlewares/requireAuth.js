const authService = require('../services/authServices')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization.split(' ')[1]

  console.log(typeof authorization)

  try {
    const payload = await authService.verifyToken(token)
    next()
  } 
  catch(err) {
    res.status(401).json({error: err})
  }
}

module.exports = requireAuth