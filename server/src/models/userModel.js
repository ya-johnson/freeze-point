const mongoose = require('mongoose')
const schema = mongoose.Schema


const userSchema = new schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  following: {
    users: [],
    topics: []
  }
  
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)