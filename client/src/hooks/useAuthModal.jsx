import { useState } from 'react'
import { useUserStore, useAuthModalStore } from '../store'


const useAuthModal = () => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const authType = useAuthModalStore(state => state.authType)
  const setAuthType = useAuthModalStore(state => state.setAuthType)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formError, setFormError] = useState()
  const changeAuth = () => authType === 'login' ? setAuthType('register') : setAuthType('login')

  const toggleAuthModal = (e, authType) => {
    const target = e.target.classList
    const auth = document.querySelector('.auth').classList
    const form = document.querySelector('.auth-form')
    const user = JSON.parse(localStorage.getItem('user')).state.user
    
    if (auth.contains('auth-modal-close')) {
      if (authType) setAuthType(authType)
      auth.remove('auth-modal-close')
    } 
    else if (target.contains('auth-close-icon') || target.contains('auth')) {
      auth.add('auth-modal-close')
      form.reset()
    }
    else if (user) {
      auth.add('auth-modal-close')
      form.reset()
    }
  }

  return {
    user,
    setUser,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    formError,
    setFormError,
    authType,
    changeAuth,
    toggleAuthModal 
  }
}


export default useAuthModal