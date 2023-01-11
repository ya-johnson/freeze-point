import axios from 'axios'
import { BASE_URL } from './index'
import { asyncHandler } from '../utils'


const getSearchResults = asyncHandler( async args => {
  const [search] = args
  const results = await axios.get(`${BASE_URL}/search?search=${search}`)
  return results
})


export {
  getSearchResults
}