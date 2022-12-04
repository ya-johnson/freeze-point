import axios from 'axios'
import { BASE_URL } from './index'
import { setAuthHeader } from './authServices'
import { toast } from 'react-toastify'
import { toastify } from '../utils'


const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`)
    const users = await response.data
    return users
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`)
    const user = await response.data
    return user
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const updateUser = async (authToken, userId, data) => {
  try {
    const header = setAuthHeader(authToken)
    const response = await axios.put(`${BASE_URL}/users/${userId}`, {userId, ...data}, header)
    const user = await response.data
    toast(`Your profile updated successfully`, toastify.autoClose)

    return { ...user, token: authToken }
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const deleteUser = async (token, userId) => {
  try {
    const header = setAuthHeader(token)
    const response = await axios.delete(`${BASE_URL}/users/${userId}`, header)
    const confirm = await response.data
    toast('Sad to see you go', toastify.autoClose)
    return confirm
  } 
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}


export {
  getUsers,
  getUser,
  updateUser,
  deleteUser
}