import validator from 'validator'


const register = (form) => {
  let error = ''

  if (!form.name || form.name.length < 5) {
    error = '-name'
  }

  if (!form.email || !validator.isEmail(form.email)) {
    error = `${error}-email`
  }

  if (!form.password || !validator.isStrongPassword(form.password)) {
    error = `${error}-password`
  }
  
  return error
}

const login = (form) => {
  let error = ''

  if (!form.email || !validator.isEmail(form.email)) {
    error = '-email'
  }

  if (!form.password || !validator.isStrongPassword(form.password)) {
    error = `${error}-password`
  }

  return error
}


export {
  register,
  login
}