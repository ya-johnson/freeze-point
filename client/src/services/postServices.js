import axios from 'axios'
import { BASE_URL } from './index'
import { setAuthHeader } from './authServices'
import { toast } from 'react-toastify'
import { toastify } from '../utils'


const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`)
    const posts = await response.data
    return posts
  } 
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
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
    toast.error(err.response.data.error, toastify.autoClose)
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
    toast.error(err.response.data.error, toastify.autoClose)
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
  getPost,
  getUserPosts,
  getTopicPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
}