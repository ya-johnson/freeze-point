import { useState } from 'react'
import { useUserStore } from '../store'


const useAuthModal = () => {

  const user = useUserStore(state => state.user)
  const [authType, setAuthType] = useState('login')
  const changeAuth = () => authType === 'login' ? setAuthType('register') : setAuthType('login')

  const toggleAuthModal = (e) => {
    const target = e.target.classList
    const auth = document.querySelector('.auth').classList
    const form = document.querySelector('.form')
    const regProfile = document.querySelector('.reg-profile')
    
    if (auth.contains('auth-modal-close')) {
      auth.remove('auth-modal-close')
    } 
    else if (target.contains('auth-close-icon') || target.contains('auth')) {
      auth.add('auth-modal-close')
      form.reset()
    }
    else if (!regProfile && user) {
      if (form) form.reset()
      auth.add('auth-modal-close')
    }
  }

  return {
    authType,
    changeAuth,
    toggleAuthModal
  }
}


export default useAuthModal