import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useDelete, useAuthModal, useEditUser } from '../hooks'
import { useUserStore } from '../store'
import { userService ,postService } from '../services'
import { AddImage, Loader, PostCard } from '../componets'
import { FaUser, FaUsers } from 'react-icons/fa'
import { BiCommentDetail, BiDetail } from 'react-icons/bi'


const Dashboard = ({ userId }) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [currentUser, setCurrentUser] = useState()
  const [userPosts, setUserPosts] = useState()
  const [isUser, setIsUser] = useState()
  const [following, setFollowing] = useState()
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useLocation()
  const { setDesc, setImage, updateUser } = useEditUser(() => setEdit(false))
  const { toggleAuthModal } = useAuthModal()

  
  const getUserAndPosts =  async () => {
    const currentUser = await userService.getUser(userId)
    const userPosts = await postService.getUserPosts(userId)
    const isUser = user?.id === currentUser.user._id
    const following = user?.id !== currentUser.user._id && user?.following.find(user => user === currentUser.user._id)

    setCurrentUser(currentUser)
    setUserPosts(userPosts)
    setIsUser(isUser)
    setFollowing(following)
    setLoading(false)
  }

  const updateUserPostsList = postId => setUserPosts(userPosts.filter(post => post._id !== postId))

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
  }, [userId, user])


  return (
    <>
    { loading ? <Loader /> :
      <main>
        <div className="container max-w-[1000px] min-h-screen">
          <div className="w-full flex flex-col sm:flex-row items-center sm:space-x-8 space-y-8
                          p-8 mb-12 bg-white dark:bg-black-dark">
          { edit ? <AddImage size={'small'}
                             defaultImage={user.image?.url}
                             setImageData={setImage} /> 
                 : <> {!currentUser.user.image ? <FaUser className="h-20 w-20 sm:h-40 sm:w-40"/>
                                               : <img className="max-w-[350px]" src={currentUser.user.image?.url}/> } </>
          }

            <div className="w-full sm:w-4/5 flex flex-col items-center justify-between space-y-8 sm:items-start">
              <div className="w-full">
                <h1 className="mb-4">{currentUser.user.name}</h1>
                { edit ? <textarea className="resize-none w-full h-44 sm:h-24 
                                              p-4 bg-grey-light dark:bg-black" 
                                   maxLength="200"
                                   placeholder={user.description ? user.description : 'No Description'}
                                   onChange={e => setDesc(e.target.value)} />
                       : <> {currentUser.user.description ? <p>{currentUser.user.description}</p> 
                                                          : <p>No description</p>}</>
                }
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaUsers className="h-5 w-5" />
                    <p>{currentUser.followers.length}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiDetail className="h-5 w-5" />
                    <p>{userPosts.length}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiCommentDetail className="h-5 w-5" />
                    <p>{userPosts.length}</p>
                  </div>
                </div>
                <div>
                { isUser ? <div className="flex space-x-6">
                  { !edit ? <button className="btn dim-blue-btn" onClick={() => setEdit(true)}>Edit</button> 
                          : <>
                              <button className="btn dim-red-btn" onClick={displayDelete}>Delete</button>
                              <button className="btn neutral-btn" onClick={() => setEdit(false)}>Discard</button>
                              <button className="btn dim-green-btn" onClick={updateUser}>Save</button>
                            </>
                  }
                           </div>
                         : <button className="btn dim-pink-btn" onClick={e => follow(e)}>Follow</button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
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