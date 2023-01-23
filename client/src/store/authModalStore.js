import create from 'zustand'


const useAuthModalStore = create(set => ({
  authType: 'login',
  setAuthType: (authType) => set(() => ({ authType: authType})),
}))


export default useAuthModalStore