import { useState, useEffect } from 'react'
import { IoMdArrowDropdown, IoMdCloseCircleOutline } from 'react-icons/io'


const Dropdown = ({ type,
                    className,
                    title,
                    list,
                    defaultItem,
                    setItem }) => {

  const [selected, setSelected] = useState(defaultItem && defaultItem)

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

  const removeItem = () => {
    setItem(null)
    setSelected(null)
  }


  useEffect(() => {
    window.addEventListener('click', e => {
      const target = e.target.classList
      const dd = document.querySelector('.dd-wrapper')

      if (target.contains('dd') && dd.classList.contains('dd-close')) {
        dd.classList.remove('dd-close')
        dd.classList.add('dd-open')
      } 
      else if (dd.classList.contains('dd-open')) {
        dd.classList.remove('dd-open')
        dd.classList.add('dd-close')
      }
    })
  }, [])


  return (
    <div className={`dd dd-wrapper cursor-pointer btn relative bg-white dark:bg-black-dark 
                    dark:border-grey-dark min-w-[130px] dd-close ${className}`}>

      <div className="dd dd-title flex justify-between items-center space-x-2 capitalize">
        <span className="dd">{title}</span>
        { selected && 
          <div className="flex items-center px-1 text-black bg-blue rounded-md">{selected}
            <IoMdCloseCircleOutline className=" h-6 w-6 ml-1 px-1"  onClick={removeItem}/>      
          </div>}
        <IoMdArrowDropdown className="dd h-6 w-6 rotate-180"/>
      </div>

      <div className="btn dd-list absolute top-full left-0 -translate-x-[1px] overflow-scroll
                      w-[calc(100%+2px)] max-h-[calc(100%*4+8px)] space-y-2 bg-white
                      dark:bg-black-dark dark:border-grey-dark duration-300 z-50">
        { list.map((item, index) => {
          return (
            <div key={index} 
                 className={`dd-item ${type === 'action' && item.className}`}
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