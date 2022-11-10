require('dotenv').config()


const config = {
  port: process.env.PORT || 5000,
  db: process.env.DB,
  secret: process.env.SECRET,
  email: {
    smtp: process.env.EMAIL_SMTP,
    from: process.env.EMAIL_FROM
  },
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
    name: process.env.CLOUDINARY_NAME
  }
}


module.exports = config