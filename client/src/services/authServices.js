import axios from 'axios'
import { BASE_URL } from './index'
import { toast } from 'react-toastify'
import { toastify, asyncHandler } from '../utils'


const setAuthHeader = (token) => {
  const header = { headers: {'Authorization': `Token ${token}`} }
  return header
}

const setUserObj = (token, user) => {
  return {
    id: user._id,
    name: user.name,
    description: user.description || null,
    image: user.image || null,
    token
  }
}

const register = asyncHandler( async args => {
  const [data] = args
  const response = await axios.post(`${BASE_URL}/auth/register`, data)
  const { user, token } = await response.data
  toast(`Hello ${user.name}, Welocome to Freeze Point`, toastify.autoClose)
  return setUserObj(token, user)
})

const login = asyncHandler( async args =>  {
  const [data] = args
  const response = await axios.post(`${BASE_URL}/auth/login`, data)
  const { user, token } = await response.data
  toast.success(`Logged in as ${user.name}`, toastify.autoClose)
  return setUserObj(token, user)
})


export {
  setAuthHeader,
  setUserObj,
  register,
  login
}