import axios from 'axios'
import { BASE_URL } from './index'
import { setAuthHeader } from './authServices'
import { toast } from 'react-toastify'
import { toastify, asyncHandler } from '../utils'


const getPosts = asyncHandler(async args => {
  const [page] = args
  const response = await axios.get(`${BASE_URL}/posts${page > 1 ? `?page=${page}` : ''}`)
  return await response.data
})

const getUserPosts = asyncHandler(async args => {
  const [userId, page] = args
  const response = await axios.get(`${BASE_URL}/posts/${userId}${page > 1 ? `?page=${page}` : ''}`)
  return await response.data
})

const getTopicPosts = asyncHandler(async args => {
  const [topic, page] = args
  const response = await axios.get(`${BASE_URL}/posts/topic/${topic}${page > 1 ? `?page=${page}` : ''}`)
  return await response.data
})

const getPost = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/post/${postId}`)
    const post = await response.data
    return post
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const createPost = async (token, data) => {
  console.log(data)
  try {
    const header = setAuthHeader(token)
    const response = await axios.post(`${BASE_URL}/posts`, data, header)
    const post = await response.data
    return post
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const updatePost = async (token, postId, data) => {
  try {
    const header = setAuthHeader(token)
    const response = await axios.put(`${BASE_URL}/posts/post/${postId}`, data, header)
    const post = await response.data
    console.log(post)
    return post
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const deletePost = async (token, postId) => {
  try {
    const header = setAuthHeader(token)
    console.log(header)
    const response = await axios.delete(`${BASE_URL}/posts/post/${postId}`, { data: { postId } , headers: header.headers})
    const confirm = await response.data
    toast.dark('Post deleted', toastify.autoClose)
    return confirm
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const likePost = async (token, postId, userId) => {
  try {
    const header = setAuthHeader(token)
    const response = await axios.put(`${BASE_URL}/posts/${postId}/likes`, {postId, userId}, header)
    const likes = await response.data
    return likes
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}

const commentPost = async (token, postId, userId, username, body) => {
  try {
    const header = setAuthHeader(token)
    const data = { postId, userId, username, body}
    console.log(data)
    const response = await axios.put(`${BASE_URL}/posts/${postId}/comments`, {postId, userId, username, body}, header)
    const comments = await response.data
    return comments
  } 
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}


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