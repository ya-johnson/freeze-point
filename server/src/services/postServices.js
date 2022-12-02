const { Post } = require('../models')
const imageService = require('./imageServices')


const getPosts = async () => {
  const posts = await Post.find().sort({ createdAt: -1 })
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
  const userPosts = await Post.find({ userId }).sort({ createdAt: -1 })
  return userPosts
}

const getTopicPosts = async (topic) => {
  const topicPosts = await Post.find({ topic }).sort({ createdAt: -1 })
  return topicPosts
}

const createPost = async (data) => {
  const { userId, username, image, title, content, topic } = data

  if (!title || !content || !topic || !image) {
    throw Error('All fields must be filled')
  }

  const post = await Post.create({ userId, username, title, content, topic })
  const img = await imageService.uploadImg(image, post._id)
  post.image = { id: img.public_id, url: img.secure_url }
  await post.save()
  return post
}

const updatePost = async (userId, postId, updatedPost) => {
  const post = await getPostById(postId)

  if (userId !== post.userId.toString()) {
    throw Error('Unauthoriazed action')
  }

  if (!updatedPost.image.id) {
    await imageService.removeImg(post.image.id)
    const img = await imageService.uploadImg(updatedPost.image, post._id)
    updatedPost.image = { id: img.public_id, url: img.secure_url }
  }

  Object.assign(post, updatedPost)
  await post.save()
  return post
}

const deletePost = async postId => {
  const post = await getPostById(postId)

  if (post.image) {
    await imageService.removeImg(post.image.id)
  }
  await post.remove()
  return post
}

const deleteAllUserPosts = async userId => {
  const userPosts = await getUserPosts(userId)
  const deletedPosts = await Promise.all(userPosts.forEach(async post => await deletePost(post._id)))
  return deletedPosts
}

const likePost = async (postId, userId) => {
  const post = await getPostById(postId)
  console.log(post.likes)
  const like = post.likes.find(like => like === userId)

  if (like) {
    post.likes.pull(userId)
    await post.save()
    return post.likes
  }

  post.likes.push(userId)
  await post.save()
  return post.likes
}

const commentPost = async (postId, userId, username, body) => {
  const post = await getPostById(postId)

  if (!body) {
    throw Error('Comment must have content')
  }

  post.comments.push({ userId, username, body, date: new Date() })
  await post.save()
  return post.comments
}


module.exports = {
  getPosts,
  getPostById,
  getUserPosts,
  getTopicPosts,
  createPost,
  updatePost,
  deletePost,
  deleteAllUserPosts,
  likePost,
  commentPost
}