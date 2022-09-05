import { useState } from 'react'
import { BiUpload } from 'react-icons/bi'


const AddImage = ({ defaultImage ,setImageData }) => {

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
    <div className="add-img">
      <img className={`add-img-img ${!image && 'hidden'}`} src={image}></img>
      <label className={`add-img-btn ${image && 'add-img-selected'}`}>
        <span className={image && 'hidden'}>Add Image</span>
        <BiUpload />
        <input type="file" 
               onChange={e => handleImg(e)} />
      </label>
    </div>
  )
}


export default AddImage