const express = require('express')
const { searchController } = require('../controllers')


const router = express.Router()

router
  .route('/')
  .get(searchController.getSearchResults)


module.exports = router