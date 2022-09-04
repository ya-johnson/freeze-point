const validator = require('validator')

const register = user => {
  if (!user.name || !user.email || !user.password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(user.email)) {
    throw Error('Not a valid Email')
  }

  if (!validator.isStrongPassword(user.password)) {
    throw Error('Password not strong enough')
  }
}

const login = user => {
  if (!user.email || !user.password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(user.email)) {
    throw Error('Not a valid Email')
  }

  if (!validator.isStrongPassword(user.password)) {
    throw Error('Password not strong enough')
  }
}


module.exports = { register, login }