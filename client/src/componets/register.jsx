import { useState } from 'react'
import { useUserStore } from '../store'
import { useAuthModal } from '../hooks'
import { authService, userService } from '../services'
import AddImage from './addImage'
import { validate } from '../utils'


const Register = ({ changeAuth }) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [formError, setFormError] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [profile, setProfile] = useState('reg-profile')
  const { toggleAuthModal } = useAuthModal()

  const register = async () => {
    e.preventDefault()
    setFormError(null)
    
    const form = { name, email, password }
    const error = validate.register(form)

    if (error) {
      setFormError(`form-err${error}`)
      return
    }

    const user = await authService.register(form)
    setUser(user)
  }

  const closeProfile = (e) => {
    setProfile(null)
    toggleAuthModal(e)
  }

  const updateUser = async (e) => {
    const userPro = await userService.updateUser(user.token, user.id, {description, image})
    setUser(userPro)
    toggleAuthModal(e)
  }


  return (

    <div>
    {!user ? 
      <div className="flex flex-col items-center space-y-6 p-14">
        <p className="text-3xl capitalize">Register</p>

        <form className={`form ${formError &&  formError}`}>
          <input className="btn name form-input" 
                type="text" name='name' placeholder='Full Name' 
                onChange={(e) => setName(e.target.value)} />

          <input className="btn email form-input" 
                type="text" name='email' placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)} />

          <input className="btn password form-input" 
                type="password" name='password' placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)} />

          <button className="btn green-btn" onClick={register}>Register</button>
        </form>

        <div className="change-auth">
          <p className="text-base text-grey-dark">Already have an account? 
            <button className="change-auth-btn" 
                    onClick={changeAuth}>Login
            </button>
          </p>
        </div>
      </div>
      :
      <div className={`${profile} space-y-6 p-14 w-[500px]`}>
        < AddImage setImageData={setImage} />
        <p className="text-2xl font-bold">{user.name}</p>
        <textarea className="resize-none w-full h-44 p-4 brd border bg-grey-light dark:bg-black"
                  maxLength={200} onChange={(e) => setDescription(e.target.value)}
                  placeholder="who why when etc are you, whatever ...">
        </textarea>
        <div className="w-full flex items-center justify-end space-x-6">
          <button className="btn neutral-btn" onClick={e => closeProfile(e)}>Skip</button>
          <button className="btn green-btn" onClick={e => updateUser(e)}>Save</button>
        </div>
      </div>
    }
    </div>

  )
}


export default Register