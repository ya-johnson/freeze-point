const paginate = async (schema, pageNumber, find) => {
  const page = parseInt(pageNumber) || 0
  const limit = 20
  const count = find ? await schema.find(find).countDocuments() : await schema.countDocuments()

  const docs = await schema.find(find ? find : {})
                           .sort({createdAt: -1})
                           .limit(limit)
                           .skip(limit * page)
                           .exec()

  return {
    page, 
    pages: Math.ceil(count / limit),
    docs,
    total: count 
  }
}


module.exports = paginate