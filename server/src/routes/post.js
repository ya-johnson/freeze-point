const express = require('express')
const { requireAuth } = require('../middlewares')
const { postController } = require('../controllers')


const router = express.Router()


router
  .route('/')
  .get(postController.getPosts)
  .post(requireAuth, postController.createPost)

router
  .route('/:userId')
  .get(postController.getUserPosts)

router
  .route('/post/:postId')
  .get(postController.getPost)
  .put(requireAuth, postController.updatePost)
  .delete(requireAuth, postController.deletePost)

router
  .route('/topic/:topic')
  .get(postController.getTopicPosts)

router
  .route('/:postId/likes')
  .put(requireAuth, postController.likePost)

router
  .route('/:postId/comments')
  .put(requireAuth, postController.commentPost)
  


module.exports = router