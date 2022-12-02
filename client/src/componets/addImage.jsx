import { useState } from 'react'
import { BiUpload } from 'react-icons/bi'


const AddImage = ({ size, defaultImage ,setImageData }) => {

  const [image, setImage] = useState()

  const handleImg = (e) => {
    const reader = new FileReader()
    const img = e.target.files[0]

    reader.readAsDataURL(img)
    reader.onloadend = () => {
      setImage(reader.result)
      setImageData(reader.result)
    }
  }


  return (
    <div className={`relative flex items-center justify-center brd border min-h-[250px] 
                     ${size === 'small' ? 'w-[380px]' : 'w-full}'}`}>
      <img className={`h-auto w-full ${!defaultImage && 'hidden'}`} src={image || defaultImage} />
      <div className="h-max">
        <label className={`flex space-x-4 items-center cursor-pointer text-xl hover:text-blue
                           ${(defaultImage || image) && 'absolute bottom-0 right-0 space-x-0 p-4 border-none'}`}>
          <BiUpload className="h-8 w-8" />
          <input className="hidden" type="file" onChange={e => handleImg(e)} />
        </label>
      </div>
    </div>
  )
}


export default AddImage