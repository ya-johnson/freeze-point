const { asyncHandler } = require('../utils')
const { searchService } = require('../services')


const getSearchResults = asyncHandler(async (req, res) => {
  const results = await searchService.getSearchResults(req.query.search)
  res.status(200).json(results)
})


module.exports = {
  getSearchResults
}