import { useState } from 'react'
import { IoMdArrowDropdown, IoMdCloseCircleOutline } from 'react-icons/io'


const Dropdown = ({ type,
                    className,
                    title,
                    list,
                    defaultItem,
                    setItem }) => {
  
  const [drop, setDrop] = useState('dd-close')
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
    <div className={`cursor-pointer btn relative 
                     bg-white dark:bg-black-dark 
                     dark:border-grey-dark min-w-[130px] 
                     ${drop} ${className}`}
         tabIndex="0" 
         onClick={toggleDropdown}
         onFocus={toggleDropdown} 
         onBlur={() => setDrop('dd-close')}>

      <div className="flex justify-between items-center space-x-2 capitalize">
        <span>{title}</span>
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

      <div className="btn dd-list absolute top-full 
                      left-0 -translate-x-[1px] overflow-scroll
                      w-[calc(100%+2px)] max-h-[calc(100%*4+8px)] 
                      space-y-2 bg-white dark:bg-black-dark 
                      dark:border-grey-dark duration-300 z-50">
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