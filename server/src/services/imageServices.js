const cloudinary = require('../utils/cloundinary')


const uploadImg = async (imgData, id) => {
  const image = await cloudinary.uploader.upload(imgData, {
    public_id: id,
    folder: 'freeze-point'
  })
  return image
}

const removeImg = async (imageId) => {
  const image = await cloudinary.uploader.destroy(imageId)
  return image
}


module.exports = { 
  uploadImg,
  removeImg
}