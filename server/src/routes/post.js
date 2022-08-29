const express = require('express')
const { requireAuth } = require('../middlewares')
const { postController } = require('../controllers')


const router = express.Router()


router
  .route('/')
  .get(postController.getPosts)
  .post(requireAuth, postController.createPost)

router
  .route('/post/:postId')
  .get(postController.getPost)

router
  .route('/:userId')
  .get(postController.getUserPosts)

router
  .route('/topic/:topic')
  .get(postController.getTopicPosts)

router
  .route('/:post')
  .put(requireAuth, postController.updatePost)
  .put(requireAuth, postController.likePost)
  .put(requireAuth, postController.commentPost)
  .delete(requireAuth, postController.deletePost)


module.exports = router