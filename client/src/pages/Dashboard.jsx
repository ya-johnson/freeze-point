import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useUserStore } from '../store'
import { authService, userService ,postService } from '../services'
import { Loader } from '../componets'

// A@a123456W@a

const Dashboard = ({ userId }) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState()

  const [currentUser, setCurrentUser] = useState()
  const [userPosts, setUserPosts] = useState()
  const [following, setFollowing] = useState(/*user.following.find(user => user === userId)*/)
  

  const getUserAndPosts =  async () => {
    const currentUser = await userService.getUser(userId)
    const userPosts = await postService.getUserPosts(userId)
    setCurrentUser(currentUser)
    console.log(userPosts)
    setUserPosts(userPosts)
    setLoading(false)
  }

  const updateUser = async () => {
    const user = await userService.updateUser(user.token, user.id, userInfo)
    setUser(user)
  }

  const follow = async () => {
    if (!user) {
      authService.toggleAuthModal()
      return
    }

    const user = await userService.follow(userId)
    setUser(user)
  }

  useEffect(() => {
    
    getUserAndPosts()

  }, [])


  return (
    <>
    { loading ? <Loader /> :
      <div className="dashboard container">
         <h1>{currentUser.name}</h1>
      </div>
    
    }
    </>

  )
}

export default Dashboard