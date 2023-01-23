import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useShow } from '../hooks'
import { searchService } from '../services'
import { FaUser } from 'react-icons/fa'
import { RiSearchLine, RiCloseLine, RiArrowLeftLine } from 'react-icons/ri'


const SearchBox = () => {

  const [value, setValue] = useState()
  const [results, setResults] = useState()
  const { show, doShow, unShow } = useShow()

  const goSearch = async () => {
    if (value.trim()) {
      const data = await searchService.getSearchResults(value)
      const results = await data.data
      console.log(value.trim(), results)
      setResults(results)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    show === 'hidden' ? doShow() : goSearch()
  }

  const clearSearch = () => {
    setResults(null)
    setValue('')
  }

  const closeSearch = () => {
    clearSearch()
    unShow()
  }


  useEffect(() => {
    if (value) goSearch()
  }, [value])


  return (
    <div className={`bg-white dark:bg-black-dark lg:min-w-[500px]
                     ${!show ? 'fixed top-0 left-0 w-screen lg:relative lg:w-auto lg:py-0 z-50' : 'relative'}`}>
      <form className={`w-full text-grey-dark ${show && 'relative'}`}>

        {!show && <RiArrowLeftLine className="icon absolute top-1/2 -translate-y-1/2 left-1" 
                                   onClick={closeSearch}/>}

        <input className={`w-full pl-8 pr-14 py-5 sm:py-7 lg:py-2 bg-white dark:bg-black-dark brd border ${show}`}
               type="text" placeholder="search ..." value={value} onChange={e => setValue(e.target.value)} />

        <button type="submit" onClick={e => handleSearch(e)}>
          <RiSearchLine className={`icon absolute top-1/2 -translate-y-1/2 ${show ? 'right-0' : 'right-2'}`}/>
        </button>

        {!show && <RiCloseLine className="absolute top-1/2 -translate-y-1/2 right-8 
                                            cursor-pointer h-6 w-6 hover:text-red-light"
                              onClick={clearSearch} />}
      </form>
      {(results?.posts.length || results?.users.length) && 
      <div className="overflow-scroll absolute top-full lg:top-[calc(100%+10px)] left-0 
                      w-full max-h-[500px] bg-white dark:bg-black-dark brd border">
        {results.users?.map(user => {
          return (
            <Link href={`/users/${user._id}`}>
              <a>
                <div className="flex items-center space-x-4 p-4 brd border-b">
                  {user.image ? <img className="h-8 w-8 rounded-full object-center" src={user.image.url} /> 
                              : <FaUser className="icon" />}
                  <p>{user.name}</p>
                </div>
              </a>
            </Link>
          )
        })}

        {results.posts?.map(post => {
          return (
            <Link href={`/posts/${post._id}`}>
              <a>
                <div className="flex items-center space-x-4 p-4 brd border-b">
                  {post.image && <img className="h-16 w-20 object-center" src={post.image.url} /> }
                  <div>
                    <p className="text-sm text-blue-light">{post.topic}</p>
                    <p className="font-bold">{post.title}</p>
                    <div className="w-full flex items-center justify-between mt-1 text-sm">
                      <p>{post.username}</p>
                      <p className=" text-grey-dark">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          )
        })}
        </div>
      }
    </div>

  )
}


export default SearchBox