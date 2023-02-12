import { useEffect } from 'react'
import { Link, useLocation, useRoute } from 'wouter'
import { useUserStore, useSettingsStore, useTopicsStore } from '../store'
import { useAuthModal, useShow } from '../hooks'
import { Dropdown, SearchBox } from './index'
import { BsSun, BsMoon, BsPlusSquare } from 'react-icons/bs'
import { GiFrozenArrow } from 'react-icons/gi'
import { RiCloseCircleFill, RiMenuFill } from 'react-icons/ri'

const Nav = () => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const theme = useSettingsStore(state => state.theme)
  const setTheme = useSettingsStore(state => state.setTheme)
  const topics = useTopicsStore(state => state.topics)
  const { show, unShow, toggleShow } = useShow()
  const { toggleAuthModal } = useAuthModal()
  const [location, setLocation] = useLocation()
  const [match, params] = useRoute('/p/:topic')

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

  const createPost = (e) => {
    if (!user) {
      toggleAuthModal(e)
      return
    }

    setLocation('/create-post')
  }

  const toggleMobileAuthModal = (e, type) => {
    unShow()
    toggleAuthModal(e, type)
  }

  const userCtrl = [
    { name: 'Dashboard', method: () => setLocation(`/users/${user.id}`), className: 'hover:text-blue' },
    { name: 'Logout', method: () => setUser(null), className: 'text-red-light'}
  ]


  useEffect(() => {
    initTheme()
  }, [])


  return (
    <nav className="sticky top-0 w-screen bg-white dark:bg-black-dark brd border-b z-30">
      <div className="relative container flex justify-between items-center py-4">
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
          
          <div className="md:relative h-6 w-6">
            {show ? <RiMenuFill className="relative icon z-40" onClick={toggleShow}/>
                  : <RiCloseCircleFill className="relative icon z-40" onClick={toggleShow}/>}
      
            <div className={`w-full md:w-auto md:max-w-[600px] absolute top-full md:-top-2 right-0 md:-right-2
                             space-y-6 p-4 md:p-8 brd border bg-white dark:bg-black-dark z-20 ${show}`}>
          
              <div className="flex flex-col space-y-1">
                <p className="text-xl font-semibold">Topics</p>
                  {topics.map(topic => {
                    return (
                      <Link href={`/p/${topic}`} >
                        <a key={`nav-${topic}`} className="footer-topic-link">{topic}</a>
                      </Link>
                    )
                  })}
              </div>
              <div className="flex md:hidden flex-col items-center space-y-4">
                <button className="w-full btn green-btn" onClick={e => toggleMobileAuthModal(e, 'login')}>Login</button>
                <button className="w-full btn blue-btn" onClick={e => toggleMobileAuthModal(e, 'register')}>Register</button>
              </div> 
            </div>
          </div>

          { user ? <Dropdown type={'action'} title={{ type: 'image', src: user.image?.url }} list={userCtrl} />
                 : <div className="hidden md:flex items-center space-x-6">
                     <button className="btn green-btn" onClick={e => toggleAuthModal(e, 'login')}>Login</button>
                     <button className="btn blue-btn" onClick={e => toggleAuthModal(e, 'register')}>Register</button>
                   </div>}
        </div>

      </div>
    </nav>
  )
}


export default Nav