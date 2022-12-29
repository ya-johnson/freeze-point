
const Pagination = ({ children, page, setPage, total, pages }) => {

  return (
    <div className="relative w-full pt-12 pb-32">
      {total && <p className="absolute top-2 right-2">{'Total Posts: ' + total}</p>}

      {children}
      
      {pages &&
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {pages.map(num => {
          return (
            <button className={`btn neutral-btn ${num === page && 'neutral-active-btn'}`} 
                    onClick={() => setPage(num)}>{num + 1}
            </button>
          )
        })}
      </div>
      }
    </div>
  )
}


export default Pagination