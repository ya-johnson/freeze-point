import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useDelete, useAuthModal } from '../hooks'
import { useUserStore } from '../store'
import { userService ,postService } from '../services'
import { AddImage, Loader, PostCard } from '../componets'
import { FaUser } from 'react-icons/fa'


const Dashboard = ({ userId }) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [currentUser, setCurrentUser] = useState()
  const [userPosts, setUserPosts] = useState()
  const [isUser, setIsUser] = useState()
  const [following, setFollowing] = useState()
  const [edit, setEdit] = useState(false)
  const [imageData, setImageData] = useState()
  const [userInfo, setUserInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useLocation()
  const { toggleAuthModal } = useAuthModal()
  
  const getUserAndPosts =  async () => {
    const currentUser = await userService.getUser(userId)
    const userPosts = await postService.getUserPosts(userId)
    const isUser = user !== null && user?.id === currentUser.user._id
    const following = user !== null && user.id !== currentUser.user._id && user.following?.find(user => user === currentUser.user._id)

    setCurrentUser(currentUser)
    setUserPosts(userPosts)
    setIsUser(isUser)
    setFollowing(following)
    setLoading(false)
  }

  const updateUserPostsList = (postId) => {
    setUserPosts(userPosts.filter(post => post._id !== postId))
  }

  const updateUser = async () => {
    const user = await userService.updateUser(user.token, user.id, userInfo)
    setUser(user)
  }

  const follow = async (e) => {
    if (!user) {
      toggleAuthModal(e)
      return
    }

    const followingUser = await userService.follow(userId)
    setUser(followingUser)
  }

  const deleteUser = async () => {
    // const user = await userService.deleteUser(user.id)
    setLocation('/')
    console.log('delete')
  }

  const displayDelete = useDelete(user?.name, deleteUser)



  useEffect(() => {
    setLoading(true)
    getUserAndPosts()
    window.scrollTo({top: 0})
  }, [userId])


  return (
    <>
    { loading ? <Loader /> :
      <main>
        <div className="container max-w-[1000px] min-h-screen">
          <div className="w-full flex flex-col sm:flex-row items-center sm:space-x-4 space-y-8
                          p-8 mb-12 bg-white dark:bg-black-dark">
            { isUser && <AddImage size={'small'}
                                  defaultImage={user.image?.url}
                                  setImageData={setImageData} /> }
            {(!isUser && !currentUser.user.image) ? <FaUser className="h-40 w-60"/>
                                                  : <img url={currentUser.user.image?.url}/> }
            
            <div className="w-full sm:w-4/5 flex flex-col items-center justify-between space-y-8">
              <div>
                <h1 className="mb-2">{currentUser.user.name}</h1>
                {currentUser.user.description ? <p>{currentUser.user.description}</p> : <p>No description</p>}
              </div>

              <div className="w-full flex items-end justify-between">
                <div className="flex flex-col space-y-1">
                  <span>{`Posts: ${userPosts.length}`}</span>
                  <span>{`Comments: 0`}</span>
                  <span>{`Followers: ${currentUser.followers.length}`}</span>
                </div>
                <div>
                { isUser ? <div className="flex space-x-6">
                             <button className="btn red-btn" onClick={displayDelete}>Delete</button>
                             <button className="btn green-btn" onClick={updateUser}>Save</button>
                           </div>
                         : <button className="btn pink-btn" onClick={e => follow(e)}>Follow</button>
                }
                </div>
              </div>
            </div>
          </div>
          
          { !userPosts.length ?
            <div className="w-full flex justify-center mt-20">
              <p className="text-2xl">wow such empty ...</p>
            </div>
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-10">
              {userPosts.map(post => {
              return (
                <PostCard post={post} 
                          updateList={updateUserPostsList}/>
              )
            })}
            </div>
          }
        </div>
      </main>
    }
    </>
  )
}


export default Dashboard