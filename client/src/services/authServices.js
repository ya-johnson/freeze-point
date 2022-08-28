import axios from 'axios'
import { BASE_URL } from './index'
import { toast } from 'react-toastify'
import { notify } from '../utils'


const toggleAuthModal = (e) => {
  const target = e.target.classList
  const auth = document.querySelector('.auth').classList

  if (auth.contains('hidden')) {
    auth.remove('hidden')
  } else if (target.contains('auth-close') || target.contains('auth')) {
    auth.add('hidden')
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

    return {
      id: user._id,
      name: user.name,
      token
    }
  } 
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data)
    const { user, token } = await response.data
    
    return {
      id: user._id,
      name: user.name,
      token
    }
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}


export {
  toggleAuthModal,
  setAuthHeader,
  register,
  login
}