import axios from 'axios'
import { BASE_URL } from './index'
import { toast } from 'react-toastify'
import { toastify } from '../utils'


const setAuthHeader = (token) => {
  const header = { headers: {'Authorization': `Token ${token}`} }
  return header
}

const register = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, data)
    const { user, token } = await response.data
    toast(`Hello ${user.name}, Welocome to Freeze Point`, toastify.autoClose)

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
  setAuthHeader,
  register,
  login
}