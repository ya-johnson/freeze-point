import { toast } from 'react-toastify'
import { toastify } from '../utils'


const asyncHandler = fn => async (...args) => {
  try {
    return await fn(args)
  }
  catch (err) {
    console.log(err)
    toast.error(err.response.data.error, toastify.autoClose)
  }
}


export default asyncHandler