const { User, Post } = require('../models')


const getSearchResults = async (term) => {
  const posts = await Post.find({title: term})
  const users = await User.find({ name: term })
  return { posts, users }
}


module.exports = {
  getSearchResults
}