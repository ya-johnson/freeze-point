import { useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { useUserStore, useSettingsStore } from '../store'
import { authService } from '../services'
import { Dropdown } from './index'
import { GiFrozenArrow } from 'react-icons/gi'
import { BsSun, BsMoon } from 'react-icons/bs'


const Nav = () => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  const theme = useSettingsStore(state => state.theme)
  const setTheme = useSettingsStore(state => state.setTheme)
  const [location, setLocation] = useLocation()


  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  const initTheme = () => {
    if (theme === 'light' && (window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  const userCtrl = [
    { 
      name: 'Create Post',
      method: () => setLocation('/create-post'),
      className: 'user-ctrl-create'
    },
    {
      name: 'Dashboard',
      method: () => setLocation(`/users/${user.id}`),
      className: 'user-ctrl-dashboard'
    },
    {
      name: 'Logout',
      method: () => setUser(null),
      className: 'user-ctrl-logout'
    }
  ]


  useEffect(() => {

    initTheme()

  }, [])


  return (
      
    <nav>
      <div className="container">

        <Link href='/'>
          <a>
            <div className="logo">
              <GiFrozenArrow />
              <h1>Freeze Point</h1>
            </div> 
          </a>
        </Link>

        <div className="nav-right">

          { theme === 'dark' ? 
              <BsSun className="icon"
                      onClick={toggleTheme} />
              : 
              <BsMoon className="icon"
                     onClick={toggleTheme} />
          }

          { !user ? 
               <button className="btn auth-btn" 
                       onClick={authService.toggleAuthModal}>Log In
               </button> 
              :
              <Dropdown type={'action'} 
                        className={'user-dd'}
                        title={user.name} 
                        list={userCtrl} />     
          }

        </div>

      </div>
    </nav>
   
  )
}


export default Nav