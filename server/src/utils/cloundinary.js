const config = require('../config')
const cloudinary = require('cloudinary').v2


cloudinary.config({
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.secret,
  cloud_name: config.cloudinary.name
})


module.exports = cloudinary