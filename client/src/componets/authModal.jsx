import { useState } from 'react'
import { authService } from '../services'
import { Login, Register } from './index'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const AuthModal = () => {

  const [authType, setAuthType] = useState('login')

  const changeAuth = () => {
    authType === 'login' ? setAuthType('register') : setAuthType('login')
  }


  return (
    <div className={`auth auth-modal-close`} 
         onClick={e => authService.toggleAuthModal(e)}>
      <div className={`auth-modal`}>

        <AiOutlineCloseCircle className="auth-close" />
        
        { authType === 'login' ?
            <Login changeAuth={changeAuth} />
          : 
            <Register changeAuth={changeAuth} />
        }
      </div>
    </div>

  )
}


export default AuthModal