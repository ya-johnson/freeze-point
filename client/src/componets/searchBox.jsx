import { useRef } from 'react'
import { useLocation } from 'wouter'
import { useShow } from '../hooks'
import { toast } from 'react-toastify'
import { toastify } from '../utils'
import { RiSearchLine, RiCloseLine, RiArrowLeftLine } from 'react-icons/ri'


const SearchBox = () => {

  const searchInput = useRef()
  const { show, doShow, unShow } = useShow()
  const [location, setLocation] = useLocation()

  const goSearch = () => {
    let value = searchInput.current.value

    if (!value || value.length < 3) {
      toast.error('search value must be at least 3 charecthers', toastify.autoClose)
    } else {
      setLocation(`/search/${value}`)
      value = '' // fix
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    show === 'hidden' ? doShow() : goSearch()
  }


  return (
    <form className={`w-6 bg-white dark:bg-black-dark text-grey-dark
                      ${!show ? 'absolute top-0 left-0 w-screen py-4 sm:relative sm:w-auto sm:py-0' : 'relative'}`}>

      {!show && <RiArrowLeftLine className="icon absolute top-1/2 -translate-y-1/2 left-1" 
                                 onClick={unShow}/>}

      <input className={`pl-8 pr-14 py-2 bg-white dark:bg-black-dark brd border ${show}`}
             type="text" placeholder="search ..." ref={searchInput} />

      <button type="submit" onClick={e => handleSearch(e)}>
        <RiSearchLine className={`icon absolute top-1/2 -translate-y-1/2 ${show ? 'right-0' : 'right-2'}`}/>
      </button>

      {!show && <RiCloseLine className="absolute top-1/2 -translate-y-1/2 right-8 
                                          cursor-pointer h-6 w-6 hover:text-red-light"
                             onClick={() => searchInput.current.value = ''} />}
    </form>
  )
}


export default SearchBox