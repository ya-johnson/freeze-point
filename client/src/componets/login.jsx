import { useState } from 'react'
import { useLocation } from 'wouter'
import { useUserStore } from '../store'
import { authService } from '../services'
import { validate } from '../utils'


const Login = ({ setVisible }) => {

  const setUser = useUserStore(state => state.setUser)

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formError, setFormError] = useState()
  const [location, setLocation] = useLocation()

  const login = async () => {
    setFormError(null)

    const form = { email, password }
    const error = validate.login(form)

    if (error) {
      setFormError(`form-err${error}`)
      return
    }
    
    const user = await authService.login(form)
    setUser(user)
    setVisible('hidden')
    setLocation('/')
  }

  return (
    <div className="login">
      
      <h2>Login</h2>

      <form className={`form ${formError ?  formError : ''}`}>

        <input className="btn email" 
               type="text" name='email' placeholder='Email' 
               onChange={(e) => setEmail(e.target.value)} />
        
        <input className="btn password" 
               type="password" name='password' placeholder='Password' 
               onChange={(e) => setPassword(e.target.value)} />
        
        <input type="button" value="Login" 
               className="btn submit" onClick={login} />
      </form>

    </div>
  )
}


export default Login