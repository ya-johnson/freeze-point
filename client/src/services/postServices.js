import axios from 'axios'
import { BASE_URL } from './index'
import { setAuthHeader } from './authServices'
import { toast } from 'react-toastify'
import { notify } from '../utils'


const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`)
    const posts = await response.data
    return posts
  } 
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const getPost = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/post/${postId}`)
    const post = await response.data
    return post
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const getUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${userId}`)
    const userPosts = await response.data
    return userPosts
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const getTopicPosts = async (topic) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/topic/${topic}`)
    const topicPosts = await response.data
    return topicPosts
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const createPost = async (token, data) => {
  console.log( token, data)
  try {
    const header = setAuthHeader(token)
    const response = await axios.post(`${BASE_URL}/posts`, data, header)
    const post = await response.data
    return post
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const updatePost = async (token, postId, data) => {
  try {
    const header = setAuthHeader(token)
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, data, header)
    const post = await response.data
    return post
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
  }
}

const deletePost = async (token, postId) => {
  try {
    const header = setAuthHeader(token)
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, header)
    const confirm = await response.data
    return confirm
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, notify.settings)
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
    toast.error(err.response.data.error, notify.settings)
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
    toast.error(err.response.data.error, notify.settings)
  }
}


export {
  getPosts,
  getPost,
  getUserPosts,
  getTopicPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
}