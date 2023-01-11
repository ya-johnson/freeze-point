const { User, Post } = require('../models')


const getSearchResults = async (term) => {
  const value = new RegExp(term, 'i')
  const posts = await Post.find({title: value})
  const users = await User.find({name: value})
  return { posts, users }
}


module.exports = {
  getSearchResults
}