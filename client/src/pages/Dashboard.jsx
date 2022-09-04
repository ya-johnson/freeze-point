import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useUserStore } from '../store'
import { authService, userService ,postService } from '../services'
import { Loader, PostCard } from '../componets'


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
    setUserPosts(userPosts)
    setLoading(false)
  }

  const updateUserPosts = (postId) => {
    setUserPosts(userPosts.filter(post => post._id !== postId))
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
         <div className="dashboard-posts">
         { userPosts.map(post => {
          return (
            <PostCard post={post} 
                      token={user.id === currentUser.id && user.token} 
                      update={updateUserPosts}/>
          )
         })}
         </div>
  
      </div>
    
    }
    </>

  )
}

export default Dashboard