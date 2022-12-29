import { toast } from 'react-toastify'
import { toastify } from '../utils'


const asyncHandler = fn => (...args) => {
  try {
    return fn(args)
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}


export default asyncHandler