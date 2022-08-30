const mongoose = require('mongoose')
const schema = mongoose.Schema


const postSchema = new schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true 
  },
  content: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  likes: [],
  comments: []

}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)