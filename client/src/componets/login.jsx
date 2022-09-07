import { useState } from 'react'
import { useLocation } from 'wouter'
import { useUserStore } from '../store'
import { authService } from '../services'
import { validate } from '../utils'


const Login = ({ changeAuth }) => {

  const setUser = useUserStore(state => state.setUser)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formError, setFormError] = useState()
  const [location, setLocation] = useLocation()

  const login = async (e) => {
    setFormError(null)

    const form = { email, password }
    const error = validate.login(form)

    if (error) {
      setFormError(`form-err${error}`)
      return
    }
    
    const user = await authService.login(form)
    setUser(user)
    authService.toggleAuthModal(e)
    setLocation('/')
  }

  return (
    <div className="login">

      <div className="login-left bg-login"></div>
      
      <div className="login-right">
        <h2>Login</h2>
        <form className={`form ${formError ?  formError : ''}`}>
          <input className="btn email form-input" 
                type="text" name='email' placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)} />
          
          <input className="btn password form-input" 
                type="password" name='password' placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)} />
          
          <input type="button" value="Login" 
                className="btn submit" onClick={e => login(e)} />
        </form>
        <div className="change-auth">
          <p className="text-base text-grey-dark">Dont have an account? 
            <button className="change-auth-btn" 
                    onClick={changeAuth}>Register
            </button>
          </p>
        </div>
      </div>

    </div>
  )
}


export default Login