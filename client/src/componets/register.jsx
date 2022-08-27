import { useState } from 'react'
import { useLocation } from 'wouter'
import { useUserStore } from '../store'
import { authService } from '../services'
import { validate } from '../utils'


const Register = () => {

  const setUser = useUserStore(state => state.setUser)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formError, setFormError] = useState()
  const [location, setLocation] = useLocation()

  const register = async () => {
    setFormError(null)
    
    const form = { name, email, password }
    const error = validate.register(form)

    if (error) {
      setFormError(`form-err${error}`)
      return
    }

    const user = await authService.register(form)
    setUser(user)
    authService.toggleAuthModal()
    setLocation(`/users/${user.id}`)
  }

  return (

    <div className="register">
      <h2>Register</h2>

      <form className={`form ${formError ?  formError : ''}`}>
        
        <input className="btn name" 
               type="text" name='name' placeholder='Full Name' 
               onChange={(e) => setName(e.target.value)} />

        <input className="btn email" 
               type="text" name='email' placeholder='Email' 
               onChange={(e) => setEmail(e.target.value)} />

        <input className="btn password" 
               type="password" name='password' placeholder='Password' 
               onChange={(e) => setPassword(e.target.value)} />

        <input type="button" value="Register" 
               className="btn submit" onClick={register} />
      </form>

    </div>

  )
}


export default Register