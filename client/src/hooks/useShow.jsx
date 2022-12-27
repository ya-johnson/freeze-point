import { useState } from 'react'


const useShow = () => {

  const [show, setShow] = useState('hidden')
  const doShow = () => setShow(null)
  const unShow = () => setShow('hidden')
  const toggleShow = () => show ? doShow() : unShow()

  return { show, doShow, unShow, toggleShow }
}


export default useShow