

const Loader = () => {

  return (
    <div className="w-screen h-screen flex items-center justify-center 
                    fixed top-0 left-0 bg-black bg-opacity-90 dark:bg-black-dark">
      <div className="loader h-10 w-10 self-center m-10 
                      rounded-full border-4 border-solid 
                    border-grey-dark border-t-grey animate-spin">
      </div>
    </div>

  )
}


export default Loader