import { useState } from 'react'
import { useUserStore } from '../store'
import { userService } from '../services'

const useEditUser = () => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [edit, setEdit] = useState(false)
  const [desc, setDesc] = useState()
  const [image, setImage] = useState()

  const openEdit = () => setEdit(true)
  const closeEdit = () => setEdit(false)
  const toggleEdit = () => edit ? setEdit(false) : setEdit(true)

  const updateUser = async () => {
    const updateUser = await userService.updateUser(user.token, user.id, { description: desc, image })
    setUser(updateUser)
    closeEdit()
  }

  return {
    edit,
    setEdit,
    setDesc,
    setImage,
    updateUser,
    openEdit,
    closeEdit,
    toggleEdit
  }
}


export default useEditUser