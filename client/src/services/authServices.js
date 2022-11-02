import axios from 'axios'
import { BASE_URL } from './index'
import { toast } from 'react-toastify'
import { toastify } from '../utils'


const toggleAuthModal = (e) => {
  const user = JSON.parse(localStorage.getItem('user')).state.user
  const target = e.target.classList
  const auth = document.querySelector('.auth').classList
  const form = document.querySelector('.form')
  const regProfile = document.querySelector('.reg-profile')

  if (auth.contains('auth-modal-close')) {
    auth.remove('auth-modal-close')
  } 
  else if (target.contains('auth-close') || target.contains('auth')) {
    auth.add('auth-modal-close')
    form.reset()
  }
  else if (!regProfile && user) {
    if (form) form.reset()
    auth.add('auth-modal-close')
  }
}

const setAuthHeader = (token) => {
  const header = { headers: {'Authorization': `Token ${token}`} }
  return header
}

const register = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, data)
    const { user, token } = await response.data
    toast.dark(`Hello ${user.name}, Welocome to Freeze Point`, toastify.autoClose)

    return {
      id: user._id,
      name: user.name,
      description: user.description,
      image: user.image,
      token
    }    
  } 
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data)
    const { user, token } = await response.data
    toast.success(`Logged in as ${user.name}`, toastify.autoClose)

    return {
      id: user._id,
      name: user.name,
      description: user.description,
      image: user.image,
      token
    }
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}


export {
  toggleAuthModal,
  setAuthHeader,
  register,
  login
}