const express = require('express')
const authRoute = require('./auth')
const userRoute = require('./user')
const postRoute = require('./post')


const router = express.Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/posts', postRoute)


module.exports = router