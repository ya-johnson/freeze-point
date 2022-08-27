import create from 'zustand'
import { persist } from 'zustand/middleware'


let userStore = set => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
})

userStore = persist(userStore, { name: 'user' })
const useUserStore = create(userStore)


export default useUserStore