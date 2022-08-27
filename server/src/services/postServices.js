const { Post } = require('../models')


const getPosts = async () => {
  const posts = await Post.find().sort({created: -1})
  return posts
}

const getPostById = async postId => {
  const post = await Post.findById(postId)

  if (!post) {
    throw Error('No such post')
  }
  return post
}

const getUserPosts = async (userId) => {
  const userPosts = await Post.find({ userId })
  return userPosts
}

const createPost = async (data) => {
  const { userId, title, content, topic } = data

  if (!title || !content) {
    throw Error('All fields must be filled')
  }
  const post = Post.create({userId, title, content, topic})
  return post
}

const updatePost = async (userId, postId, updatedPost) => {
  const post = await getPostById(postId)

  if (userId !== post.userId) {
    throw Error('Unauthoriazed action')
  }

  Object.assign(post, updatedPost)
  await post.save()
  return post
}

const deletePost = async postId => {
  const post = await getPostById(postId)
  await post.remove()
  return post
}

const likePost = async (postId, userId) => {
  const post = await getPostById(postId)
  const like = post.likes.find( like => like === userId )

  if (like) {
    post.likes.pull(userId)
    await post.save()
    return post
  }

  post.likes.push(userId)
  await post.save()
  return post
}

const commentPost = async (postId, userId, body) => {
  const post = await getPostById(postId)

  if (!body) {
    throw Error('Comment must have content')
  }

  post.comments.push({ userId, body, date: new Date() })
  await post.save()
  return post
}


module.exports = {
  getPosts,
  getPostById,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost
}