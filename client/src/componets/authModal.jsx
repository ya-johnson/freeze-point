import { useAuthModal, useWindow } from '../hooks'
import { Login, Register } from './index'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const AuthModal = () => {

  const { authType, toggleAuthModal } = useAuthModal()
  const { width } = useWindow()

  return (
    <div className="auth auth-modal-close" 
         onClick={e => toggleAuthModal(e)}>
      <div className={`auth-modal ${width >= 500 ? 'w-[450px]' : `w-[calc(${width}-16px)]`}`}>
        <div className="auth-close">
          <AiOutlineCloseCircle className="auth-close-icon" />
        </div>
        {authType === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  )
}


export default AuthModal