// express middleware function to catch async errors

const asyncHandler = fn => (req, res, next) => {

  Promise
    .resolve( fn(req, res, next) )
    .catch( err => next(err) )
}

module.exports = asyncHandler