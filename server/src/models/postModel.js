const mongoose = require('mongoose')
const schema = mongoose.Schema


const likeSchema = new schema({
  userId: {
    type: String
  }
})


const commentSchema = new schema({
  userId: {
    type: String
  },
  body: {
    type: String
  }
}, { timestamps: true })


const postSchema = new schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  likes: [ likeSchema ],
  comments: [ commentSchema ]

}, { timestamps: true })


module.exports = mongoose.model('Post', postSchema)