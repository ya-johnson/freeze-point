import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoMdArrowDropdown, IoMdCloseCircleOutline } from 'react-icons/io'


const Dropdown = ({ type,
                    className,
                    title,
                    list,
                    defaultItem,
                    setItem }) => {
  
  const [drop, setDrop] = useState('dd-close')
  const [titleImg, setTitleImg] = useState(typeof title === 'object')
  const [selected, setSelected] = useState(defaultItem && defaultItem)

  const toggleDropdown = () => drop === 'dd-close' ? setDrop('dd-open') : setDrop('dd-close')

  const onItemClick = (item) => {
    if (type === 'action') {
      item.method()
      toggleDropdown()
    } 
    else if (type === 'select') {
      setItem(item)
      setSelected(item)
      setDrop('dd-close')
    }
  }

  const removeItem = () => {
    setItem(null)
    setSelected(null)
  }
  

  return (
    <div className={`cursor-pointer relative py-2
                     bg-white dark:bg-black-dark 
                     dark:border-grey-dark ${drop} ${className}
                     ${titleImg ? 'px-0' : 'min-w-[130px] px-2 sm:px-4'}`}
         tabIndex="0" 
         onClick={toggleDropdown}
         onFocus={toggleDropdown} 
         onBlur={() => setDrop('dd-close')}>

      <div className={`flex justify-between items-center space-x-1 capitalize`}>
        { !titleImg ? <span>{title}</span>
                    : <> {(titleImg && title.src) ? <img src={title.src} className="h-8 w-8 rounded-full object-center"/> 
                                                  : <FaUser className="icon" />} </> }
        { selected && 
          <div className="flex items-center pl-1 
                          text-black bg-blue rounded-md">
            {selected}
            <IoMdCloseCircleOutline className="h-6 w-6 ml-1 px-1
                                               rounded-r-md bg-grey 
                                              dark:bg-grey-dark hover:text-red" 
                                    onClick={removeItem}/>      
          </div>}
        <IoMdArrowDropdown className="h-6 w-6 rotate-180"/>
      </div>

      <div className={`dd-list absolute top-full py-2 px-4 overflow-scroll 
                       space-y-2 bg-white dark:bg-black-dark max-h-[calc(100%*4+8px)] 
                       dark:border-grey-dark duration-300 z-50
                       ${titleImg ? 'min-w-[100px] right-0 text-right' 
                                  : 'w-[calc(100%+2px)] left-0 -translate-x-[1px]'}`}>
        { list.map((item, index) => {
          return (
            <div key={index} 
                 className={`${type === 'action' && item.className}`}
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