import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


const Pagination = ({ children, page, setPage, total, pages }) => {

  return (
    <div className="relative w-full pt-12 pb-32">
      {total && <p className="absolute top-2 right-2 py-2 px-4 brd border">{'Total Posts: ' + total}</p>}

      {children}
      
      {pages &&
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {pages.length >= 2 && <button className="btn neutral-btn py-0 px-1" onClick={() => setPage(page - 1)}>
                               <MdChevronLeft className="h-8 w-8" />
                             </button>
        }
        
        {pages.map(num => {
          return (
            <button className={`btn neutral-btn ${num === page && 'neutral-active-btn'}`} 
                    onClick={() => setPage(num)}>{num + 1}
            </button>
          )
        })}
        
        {pages.length >= 2 && <button className="btn neutral-btn py-0 px-1" onClick={() => setPage(page + 1)}>
                               <MdChevronRight className="h-8 w-8" />
                             </button>
        }

      </div>
      }
    </div>
  )
}


export default Pagination