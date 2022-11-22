import { useAuthModal } from '../hooks'
import { Login, Register } from './index'
import { AiOutlineCloseCircle } from 'react-icons/ai'


const AuthModal = () => {

  const { authType, changeAuth, toggleAuthModal } = useAuthModal()

  return (
    <div className="auth auth-modal-close" 
         onClick={e => toggleAuthModal(e)}>
      <div className="auth-modal sm:w-[450px]">
        <div className="auth-close">
          <AiOutlineCloseCircle className="auth-close-icon" />
        </div>
        {authType === 'login' ? <Login changeAuth={changeAuth} /> 
                              : <Register changeAuth={changeAuth} />}
      </div>
    </div>
  )
}


export default AuthModal