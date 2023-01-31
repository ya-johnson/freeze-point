import { useAuthModal } from '../hooks'
import { Login, Register } from './index'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const AuthModal = () => {

  const { authType, toggleAuthModal } = useAuthModal()

  return (
    <div className="auth auth-modal-close" 
         onClick={e => toggleAuthModal(e)}>
      <div className="auth-modal sm:w-[450px]">
        <div className="auth-close">
          <AiOutlineCloseCircle className="auth-close-icon" />
        </div>
        {authType === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  )
}


export default AuthModal