
const Pagination = ({ children, page, setPage, total, pages }) => {

  return (
    <div className="relative w-full">
      {total && <p className="absolute top-1 right-2">{total + 'Posts'}</p>}

      {children}
      
      {pages &&
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {pages.map(num => {
          <button className={`btn neutral-btn ${num === page && 'neutral-active-btn'}`} 
                  onClick={() => setPage(num)}>{num}
          </button>
        })}
      </div>
      }
    </div>
  )
}


export default Pagination