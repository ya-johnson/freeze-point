import { useState } from 'react'
import { useUserStore } from '../store'
import { userService } from '../services'

const useEditUser = (closeForm) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [desc, setDesc] = useState()
  const [image, setImage] = useState()

  const updateUser = async () => {
    const updateUser = await userService.updateUser(user.token, user.id, { description: desc, image })
    setUser(updateUser)
    closeForm()
  }

  return {
    setDesc,
    setImage,
    updateUser,
  }
}


export default useEditUser