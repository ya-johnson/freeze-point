import * as authService from './authServices'
import * as userService from './userServices'
import * as postService from './postServices'
import * as searchService from './searchServices'


const BASE_URL = import.meta.env.VITE_SERVER_URL
console.log(BASE_URL)


export {
  BASE_URL,
  authService,
  userService,
  postService,
  searchService
}