import { useState } from 'react'
import { useLocation } from 'wouter'
import { useUserStore } from '../store'
import { authService } from '../services'
import { validate } from '../utils'


const Register = ({ changeAuth }) => {

  const setUser = useUserStore(state => state.setUser)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formError, setFormError] = useState()
  const [location, setLocation] = useLocation()

  const register = async (e) => {
    setFormError(null)
    
    const form = { name, email, password }
    const error = validate.register(form)

    if (error) {
      setFormError(`form-err${error}`)
      return
    }

    const user = await authService.register(form)
    setUser(user)
    authService.toggleAuthModal(e)
    setLocation(`/users/${user.id}`)
  }

  return (

    <div className="register">

      <div className="register-left bg-register"></div>

      <div className="register-right">
        <h2>Register</h2>
        <form className={`form ${formError ?  formError : ''}`}>
          
          <input className="btn name form-input" 
                type="text" name='name' placeholder='Full Name' 
                onChange={(e) => setName(e.target.value)} />

          <input className="btn email form-input" 
                type="text" name='email' placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)} />

          <input className="btn password form-input" 
                type="password" name='password' placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)} />

          <input type="button" value="Register" 
                className="btn submit" onClick={e => register(e)} />
        </form>
        <div className="change-auth">
          <p className="text-base text-grey-dark">Already have an account? 
            <button className="change-auth-btn" 
                    onClick={changeAuth}>login
            </button>
          </p>
        </div>
      </div>


    </div>

  )
}


export default Register