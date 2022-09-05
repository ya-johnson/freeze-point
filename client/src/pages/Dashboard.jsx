import { useState, useEffect } from 'react'
import { useUserStore } from '../store'
import { authService, userService ,postService } from '../services'
import { AddImage, Loader, PostCard } from '../componets'
import { FaUser } from 'react-icons/fa'


const Dashboard = ({ userId }) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  const [loading, setLoading] = useState(true)
  const [imageData, setImageData] = useState()
  const [userInfo, setUserInfo] = useState()
  
  const [currentUser, setCurrentUser] = useState()
  const [userPosts, setUserPosts] = useState()
  const [following, setFollowing] = useState(/*user.following.find(user => user === userId)*/)
  const [isUser, setIsUser] = useState(user !== null && user.id === currentUser.id)
  

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
        <div className="dashboard-header">
          { isUser ?
            <AddImage defaultImage={user.image && user.image.url}
                      setImageData={setImageData} />
            :
            <div className="dashboard-left">
              <FaUser />
            </div>
          }
          
          <div className="dashboard-header-right">
            <h1>{currentUser.name}</h1>
          </div>
        </div>
         
         <div className="dashboard-posts">
         { userPosts.map(post => {
          return (
            <PostCard post={post} 
                      token={ isUser && user.token} 
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