import { useState } from 'react'
import { IoMdArrowDropdown, IoMdCloseCircleOutline } from 'react-icons/io'


const Dropdown = ({ type, className, title, list, setItem }) => {

  const [isMenu, setIsMenu] = useState('dd-close')
  const [selected, setSelected] = useState()
  

  const toggleDropdown = () => {
    isMenu === 'dd-close' ? setIsMenu('dd-open') : setIsMenu('dd-close')
  }

  const onItemClick = (item) => {
    if (type === 'action') {
      item.method()
      toggleDropdown()
    } 
    else if (type === 'select') {
      setItem(item)
      setSelected(item)
      toggleDropdown()
    }
  }


  return (
    <div className={`btn dd-wrapper ${className} ${isMenu}`}
         onClick={toggleDropdown}>

      <div className="dd-title">
        <span>{title}</span>
        { selected && 
          <div className="dd-selected-item">{selected}
            <IoMdCloseCircleOutline className="dd-selected-item-remove" 
                                    onClick={() => setSelected(null)}/>      
          </div>}
        <IoMdArrowDropdown className="dd-icon"/>
      </div>

      <div className="btn dd-list">
        { list.map( item => {
          return (
            <div key={type === 'select' ? item : item.name} 
              className="dd-item" 
              onClick={() => onItemClick(item)}>
              {type === 'select' ? item : item.name}
            </div>
          )
        })}
      </div>

    </div>
  )
}


export default Dropdown