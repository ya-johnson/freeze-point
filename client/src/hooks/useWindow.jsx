import { useState, useEffect } from 'react'


const useWindow = () => {

  const [height, setHeight] = useState()
  const [width, setWidth] = useState()
  const [scrollY, setScrollY] = useState()
  const [scrollX, setScrollX] = useState()

  const getWindowSize = () => {
    setHeight(window.innerWidth)
    setWidth(window.innerWidth)
  }

  const getWindowScroll = () => {
    setScrollY(window.scrollY)
    setScrollX(window.screenX)
  }

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', getWindowSize)
      window.addEventListener('scroll', getWindowScroll)
    }
  }, [])

  return { height, width, scrollY, scrollX }
}


export default useWindow