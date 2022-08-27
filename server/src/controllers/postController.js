const asyncHandler = require('../utils/asyncHandler')
const { postService } = require('../services')


const getPosts = asyncHandler( async (req, res) => {
  const posts = await postService.getPosts()
  res.status(200).json(posts)
})

const getPost = asyncHandler( async (req, res) => {
  const { postId } = req.params
  console.log(postId)
  const post = await postService.getPostById(postId)
  res.status(200).json(post)
})

const getUserPosts = asyncHandler( async (req, res) => {
  const { userId } = req.params
  const userPosts = await postService.getUserPosts(userId)
  res.status(200).json(userPosts)
})

const createPost = asyncHandler( async (req, res) => {
  console.log(req.body)
  const post = await postService.createPost(req.body)
  res.status(200).json(post)
})

const updatePost = asyncHandler( async (req, res) => {
  const post = await postService.updatePost(req.userId, req.body.postId, req.body.post)
  res.status(200).json(post)
})

const deletePost = asyncHandler( async (req, res) => {
  const post = await postService.deletePost(req.body)
  res.status(200).json('Post Deleted:')
})

const likePost = asyncHandler( async (req, res) => {
  const post = await postService.likePost(req.body)
  res.status(200).json(post)
})

const commentPost = asyncHandler( async (req, res) => {
  const post = await postService.commentPost(req.body.postId, req.body.userId, req.body.comment)
  res.status(200).json(post)
})


module.exports = {
  getPosts,
  getPost,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
}