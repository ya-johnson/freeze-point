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
  console.log(data)

  if (!title || !content || !topic) {
    throw Error('All fields must be filled')
  }

  const post = await Post.create({ userId, username, title, content, topic })
  console.log(post)
  
  if ( image ) {
    const img = await imageService.uploadImg(image, post._id)
    console.log(img.public_id, img.url)
    post.image = { id: img.public_id, url: img.secure_url }
    await post.save()
  }

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

  if (post.image) {
    await imageService.removeImg(post.image.id)
  }
  await post.remove()
  return post
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
  likePost,
  commentPost
}