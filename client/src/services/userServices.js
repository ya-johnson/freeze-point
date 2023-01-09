import axios from 'axios'
import { BASE_URL } from './index'
import { authService } from './'
import { toast } from 'react-toastify'
import { toastify, asyncHandler } from '../utils'


const getUsers = asyncHandler( async args => {
  const response = await axios.get(`${BASE_URL}/users`)
  return await response.data
})

const getUser = asyncHandler( async args => {
  const [userId] = args
  const response = await axios.get(`${BASE_URL}/users/${userId}`)
  return await response.data
})

const updateUser = asyncHandler( async args => {
  const [authToken, userId, data] = args
  const header = authService.setAuthHeader(authToken)
  const response = await axios.put(`${BASE_URL}/users/${userId}`, data, header)
  const user = await response.data
  toast(`Your profile updated successfully`, toastify.autoClose)
  return authService.setUserObj(authToken, user)
})

const deleteUser = asyncHandler( async args => {
  const [token, userId] = args
  const header = authService.setAuthHeader(token)
  const response = await axios.delete(`${BASE_URL}/users/${userId}`, header)
  toast('Sad to see you go', toastify.autoClose)
})


export {
  getUsers,
  getUser,
  updateUser,
  deleteUser
}