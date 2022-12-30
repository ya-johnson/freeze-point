import axios from 'axios'
import { BASE_URL } from './index'
import { authService } from './'
import { toast } from 'react-toastify'
import { toastify, asyncHandler } from '../utils'


const getPosts = asyncHandler( async args => {
  const [page] = args
  const response = await axios.get(`${BASE_URL}/posts${page > 1 ? `?page=${page}` : ''}`)
  return await response.data
})

const getUserPosts = asyncHandler( async args => {
  const [userId, page] = args
  const response = await axios.get(`${BASE_URL}/posts/${userId}${page > 1 ? `?page=${page}` : ''}`)
  return await response.data
})

const getTopicPosts = asyncHandler( async args => {
  const [topic, page] = args
  const response = await axios.get(`${BASE_URL}/posts/topic/${topic}${page > 1 ? `?page=${page}` : ''}`)
  return await response.data
})

const getPost = asyncHandler( async args => {
  const [postId] = args
  const response = await axios.get(`${BASE_URL}/posts/post/${postId}`)
  return await response.data
})

const createPost = asyncHandler( async args => {
  const [token, data] = args
  const header = authService.setAuthHeader(token)
  const response = await axios.post(`${BASE_URL}/posts`, data, header)
  return await response.data
})

const updatePost = asyncHandler( async args => {
  const [token, postId, data] = args
  const header = authService.setAuthHeader(token)
  const response = await axios.put(`${BASE_URL}/posts/post/${postId}`, data, header)
  return await response.data
})

const deletePost = asyncHandler( async args => {
  const [token, postId] = args
  const header = authService.setAuthHeader(token)
  const response = await axios.delete(`${BASE_URL}/posts/post/${postId}`, { data: { postId } , headers: header.headers})
  toast.dark('Post deleted', toastify.autoClose)
  return await response.data
})

const likePost = asyncHandler( async args => {
  const [token, postId, userId] = args
  const header = authService.setAuthHeader(token)
  const response = await axios.put(`${BASE_URL}/posts/${postId}/likes`, {postId, userId}, header)
  return await response.data
})

const commentPost = asyncHandler( async args => {
  const [token, postId, userId, username, body] = args
  const header = authService.setAuthHeader(token)
  const response = await axios.put(`${BASE_URL}/posts/${postId}/comments`, {postId, userId, username, body}, header)
  return await response.data
})


export {
  getPosts,
  getUserPosts,
  getTopicPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
}