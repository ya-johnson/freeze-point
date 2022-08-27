import axios from 'axios'
import { BASE_URL } from './index'
import { toast } from 'react-toastify'
import { notify } from '../utils'


const toggleAuthModal = (e) => {
  const sign = document.querySelector('.sign').classList
  sign.contains('hidden') ? sign.remove('hidden') : sign.add('hidden')
}

const exitAuthModal = () => {
  const root = document.getElementById('root')
  root.addEventListener('click', e => {
    if (!e.target.classList.contains('sign')) {
      document.querySelector('.sign').classList.add('hidden')
    }
  })
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
  exitAuthModal,
  setAuthHeader,
  register,
  login
}