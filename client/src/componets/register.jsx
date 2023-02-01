import { useAuthModal } from '../hooks'
import { authService } from '../services'
import { validate } from '../utils'


const Register = () => {

  const { setUser,
          name, 
          setName,
          email, 
          setEmail,
          password, 
          setPassword,
          formError, 
          setFormError,
          changeAuth,
          toggleAuthModal } = useAuthModal()

  const register = async (e) => {
    e.preventDefault()
    setFormError(null)
    
    const form = { name, email, password }
    const error = validate.register(form)
    console.log(error, form)
    if (error) {
      setFormError(`form-err${error}`)
      return
    }

    const user = await authService.register(form)
    setUser(user)
    toggleAuthModal(e)
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-14">
      <p className="text-3xl capitalize">Register</p>

      <form className={`auth-form ${formError && formError}`}>
        <input className="btn name" 
              type="text" name='name' placeholder='Full Name' 
              onChange={(e) => setName(e.target.value)} />

        <input className="btn email" 
              type="text" name='email' placeholder='Email' 
              onChange={(e) => setEmail(e.target.value)} />

        <input className="btn password" 
              type="password" name='password' placeholder='Password' 
              onChange={(e) => setPassword(e.target.value)} />

        <button className="btn green-btn" onClick={e => register(e)}>Register</button>
      </form>

      <div className="change-auth">
        <p className="text-base text-grey-dark">Already have an account? 
          <button className="change-auth-btn" 
                  onClick={changeAuth}>Login
          </button>
        </p>
      </div>
    </div>
  )
}


export default Register