import { useRef } from 'react'
import { toast } from 'react-toastify'
import { toastify } from '../utils'


const useDelete =(key, deleteMethod) => {

  const input = useRef()

  const onMethod = () => {
    if (input.current.value === key) {
      deleteMethod()
      toast.dismiss()
    } else {
      input.current.classList.add('border-red')
    }
  }
  
  const box = ({ closeToast, toastProps }) => {
    return (
      <div className="flex flex-col items-center p-4">
        <p>In order to Delete type</p>
        <p className='font-bold text-red'>{key}</p>
        <input className="input p-2 my-4 border border-solid" type="text" ref={input} />
        <button className="py-1 px-2 text-red hover:bg-red hover:text-black-dark" 
                onClick={onMethod}>Delete</button>
      </div>
    )
  }

  const display = () => toast.dark(box, toastify.open)

  return display
}


export default useDelete