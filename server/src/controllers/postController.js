const { asyncHandler } = require('../utils')
const { postService } = require('../services')


const getPosts = asyncHandler( async (req, res) => {
  const posts = await postService.getPosts()
  res.status(200).json(posts)
})

const getPost = asyncHandler( async (req, res) => {
  const { postId } = req.params
  const post = await postService.getPostById(postId)
  res.status(200).json(post)
})

const getUserPosts = asyncHandler( async (req, res) => {
  const { userId } = req.params
  const userPosts = await postService.getUserPosts(userId)
  res.status(200).json(userPosts)
})

const getTopicPosts = asyncHandler( async (req, res) => {
  const { topic } = req.params
  const topicPosts = await postService.getTopicPosts(topic)
  res.status(200).json(topicPosts)
})

const createPost = asyncHandler( async (req, res) => {
  const post = await postService.createPost(req.body)
  res.status(200).json(post)
})

const updatePost = asyncHandler( async (req, res) => {
  const post = await postService.updatePost(req.userId, req.body.postId, req.body.post)
  res.status(200).json(post)
})

const deletePost = asyncHandler( async (req, res) => {
  const post = await postService.deletePost(req.body.postId)
  res.status(200).json('Post Deleted:')
})

const likePost = asyncHandler( async (req, res) => {
  const likes = await postService.likePost(req.body.postId, req.body.userId)
  res.status(200).json(likes)
})

const commentPost = asyncHandler( async (req, res) => {
  const { postId, userId, username, body } = req.body
  const comments = await postService.commentPost(postId, userId, username, body)
  res.status(200).json(comments)
})


module.exports = {
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