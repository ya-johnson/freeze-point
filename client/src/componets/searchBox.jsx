import { useState, useRef } from 'react'
import { useLocation } from 'wouter'
import { toast } from 'react-toastify'
import { toastify } from '../utils'
import { RiSearchLine, RiCloseLine, RiArrowLeftLine } from 'react-icons/ri'


const SearchBox = () => {

  const searchInput = useRef()
  const [search, setSearch] = useState('hidden')
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
    search === 'hidden' ? setSearch(null) : goSearch()
  }


  return (
    <form className="relative text-grey-dark">
      {!search && <RiArrowLeftLine className="absolute top-1/2 -translate-y-1/2 left-1 
                                              cursor-pointer h-6 w-6 hover:text-white" 
                                   onClick={() => setSearch('hidden')}/>}
      <input className={`pl-8 pr-14 py-2 brd border border-grey-dark 
                      bg-white dark:bg-black-dark 
                      focus:border-black-dark dark:focus:border-grey-light ${search}`}
             type="text" placeholder="search ..." ref={searchInput} />
      <button type="submit" onClick={e => handleSearch(e)}>
        <RiSearchLine className={`absolute top-1/2 -translate-y-1/2 ${search ? 'right-0' : 'right-2'}
                                  cursor-pointer h-5 w-5 hover:text-white`}/>
      </button>
      {!search && <RiCloseLine className="absolute top-1/2 -translate-y-1/2 right-8 
                                          cursor-pointer h-6 w-6 hover:text-red-light"
                               onClick={() => searchInput.current.value = ''} />}
    </form>
  )
}


export default SearchBox