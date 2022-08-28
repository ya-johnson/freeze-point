import { useState } from 'react'
import { useUserStore } from '../store'
import { authService } from '../services'
import { Login, Register } from './index'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const AuthModal = () => {

  const user = useUserStore(state => state.user)
  const [authType, setAuthType] = useState('login')

  const changeAuth = () => {
    authType === 'login' ? setAuthType('register') : setAuthType('login')
  }


  return (
    <div className="auth hidden" onClick={e => authService.toggleAuthModal(e)}>
      <div className={`auth-modal`}>

        <AiOutlineCloseCircle className="auth-close" />
        

        { authType === 'login' ?
          <>
            <Login />
            <p>Dont have an account? 
              <button className="change-auth" 
                      onClick={changeAuth}>Register
              </button>
            </p>
          </>
          : 
          <>
            <Register />
            <p>Already have an account? 
              <button className="change-auth" 
                      onClick={changeAuth}>Sign In
              </button>
            </p>
          </>
        }

      </div>
    </div>

  )
}


export default AuthModal