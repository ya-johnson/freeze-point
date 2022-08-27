const express = require('express')
const { requireAuth } = require('../middlewares')
const { userController } = require('../controllers')


const router = express.Router()


router
  .route('/')
  .get(userController.getUsers)

router
  .route('/:userId')
  .get(userController.getUser)
  .put(requireAuth, userController.updateUser)
  .delete(requireAuth, userController.deleteUser)


module.exports = router