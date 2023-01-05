import { useAuthModal } from '../hooks'
import { authService } from '../services'
import { validate } from '../utils'


const Login = ({ changeAuth }) => {

  const { setUser,
          email,
          setEmail,
          password,
          setPassword,
          formError,
          setFormError,
          toggleAuthModal } = useAuthModal()

  const login = async (e) => {
    e.preventDefault()
    setFormError(null)

    const form = { email, password }
    const error = validate.login(form)

    if (error) {
      setFormError(`form-err${error}`)
      return
    }
    
    const user = await authService.login(form)
    setUser(user)
    toggleAuthModal(e)
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-14">
      <p className="text-3xl capitalize">Login</p>
      
      <form className={`auth-form ${formError && formError}`}>
        <input className="btn email" 
               type="text" name='email' placeholder='Email' 
               onChange={(e) => setEmail(e.target.value)} />
          
        <input className="btn password" 
               type="password" name='password' placeholder='Password' 
               onChange={(e) => setPassword(e.target.value)} />
          
        <button className="btn green-btn" onClick={e => login(e)}>Login</button>
      </form>

      <div className="change-auth">
        <p className="text-base text-grey-dark">Dont have an account? 
          <button className="change-auth-btn" 
                  onClick={changeAuth}>Register
          </button>
        </p>
      </div>
    </div>
  )
}


export default Login