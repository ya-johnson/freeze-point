import { useEffect } from 'react'
import { Link, useLocation, useRoute } from 'wouter'
import { useUserStore, useSettingsStore } from '../store'
import { useAuthModal } from '../hooks'
import { Dropdown, MenuBox, SearchBox } from './index'
import { BsSun, BsMoon, BsPlusSquare } from 'react-icons/bs'
import { GiFrozenArrow } from 'react-icons/gi'


const Nav = () => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const theme = useSettingsStore(state => state.theme)
  const setTheme = useSettingsStore(state => state.setTheme)
  const [location, setLocation] = useLocation()
  const [match, params] = useRoute('/p/:topic')
  const { toggleAuthModal } = useAuthModal()

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
      name: 'Dashboard',
      method: () => setLocation(`/users/${user.id}`),
      className: 'hover:text-blue'
    },
    {
      name: 'Logout',
      method: () => setUser(null),
      className: 'text-red-light'
    }
  ]

  const createPost = (e) => {
    if (!user) {
      toggleAuthModal(e)
      return
    }

    setLocation('/create-post')
  }


  useEffect(() => {
    initTheme()
  }, [])


  return (
    <nav className="sticky top-0 w-screen bg-white dark:bg-black-dark brd border-b z-30">
      <div className="container flex justify-between items-center py-4">
        <div className="hidden md:flex items-end font-covered">
          <Link href='/'>
            <a className="text-5xl hover:text-pink">{`freeze point${!match ? '.' : ''}`}</a>
          </Link>
          {match && <p className="text-2xl text-grey-dark">{'/p/' + params.topic}</p>}
        </div>
        <Link href='/'><a className="md:hidden"><GiFrozenArrow className="h-8 w-8 hover:text-pink-light"/></a></Link>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <SearchBox />
          <button onClick={e => createPost(e)}><BsPlusSquare className="icon"/></button>
          
          { theme === 'dark' ? <BsSun className="icon" onClick={toggleTheme} />
                             : <BsMoon className="icon" onClick={toggleTheme} /> }
          
          <MenuBox />

          { user ? <Dropdown type={'action'} title={{ type: 'image', src: user.image?.url }} list={userCtrl} />
                  : <div className="flex items-center space-x-6">
                      <button className="btn green-btn" onClick={e => toggleAuthModal(e, 'login')}>Login</button>
                      <button className="btn blue-btn" onClick={e => toggleAuthModal(e, 'register')}>Register</button>
                    </div>  
          }
        </div>

      </div>
    </nav>
  )
}


export default Nav