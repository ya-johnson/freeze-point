import { useState } from 'react'
import { useUserStore } from '../store'
import { authService } from '../services'
import { Login, Register } from './index'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const AuthModal = () => {

  const user = useUserStore(state => state.user)
  const [signType, setSignType] = useState('login')

  const changeSign = () => {
    signType === 'login' ? setSignType('register') : setSignType('login')
  }


  return (
    <div className={`sign hidden`}>

      <AiOutlineCloseCircle className="icon sign-close" 
                            onClick={authService.toggleAuthModal} />

      { signType === 'login' ?
        <>
          <Login />
          <p>Dont have an account? 
            <button className="change-sign" 
                    onClick={changeSign}>Register
            </button>
          </p>
        </>
        : 
        <>
          <Register />
          <p>Already have an account? 
            <button className="change-sign" 
                    onClick={changeSign}>Sign In
            </button>
          </p>
        </>
      }

    </div>
  )
}


export default AuthModal