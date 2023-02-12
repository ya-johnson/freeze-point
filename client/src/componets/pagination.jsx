import { PostCard, Latest } from './'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


const Pagination = ({ page, setPage, total, pages, posts, updatePosts }) => {

  const nextPage = () => (page < pages.length) ? setPage(page + 1) : setPage(page)
  const previousPage = () => (page > 1) ? setPage(page - 1) : setPage(page)

  return (
    <div className="relative w-full py-14">
      <Latest />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
        {posts && posts.map(post => <PostCard key={post._id} post={post} updateList={updatePosts}/>)}
      </div>
      
      <div className="w-full absolute bottom-2">
        <div className="absolute top-0 right-0 brd border hidden md:flex">
          <p className="py-2 px-4">{'Posts ' + total}</p>
          <p className="py-2 px-4 brd border-l">{'Pages ' + pages.length}</p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 flex space-x-2">
          {pages.length >= 2 && <button className="btn neutral-btn py-0 px-1" onClick={previousPage}>
                                  <MdChevronLeft className="h-8 w-8" />
                                </button>}
            
          {pages.map(num => {
            return (
              <button className={`btn neutral-btn ${num === page && 'neutral-active-btn'}`} 
                      onClick={() => setPage(num)} key={`page-${num}`}>{num} 
              </button>
            )
          })}
            
          {pages.length >= 2 && <button className="btn neutral-btn py-0 px-1" onClick={nextPage}>
                                  <MdChevronRight className="h-8 w-8" />
                                </button>}        
        </div>
      </div>
    </div>
  )
}


export default Pagination