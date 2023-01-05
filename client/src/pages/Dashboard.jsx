import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useDelete, useAuthModal, useEditUser, usePagination } from '../hooks'
import { useUserStore } from '../store'
import { userService ,postService } from '../services'
import { AddImage, Loader, Pagination } from '../componets'
import { FaUser, FaUsers } from 'react-icons/fa'
import { BiCommentDetail, BiDetail } from 'react-icons/bi'


const Dashboard = ({ userId }) => {

  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [currentUser, setCurrentUser] = useState()
  const [isUser, setIsUser] = useState()
  const [following, setFollowing] = useState()
  const [location, setLocation] = useLocation()
  const { edit, openEdit, closeEdit, setDesc, setImage, updateUser } = useEditUser()
  const { toggleAuthModal } = useAuthModal()
  const { page, setPage, total, pages, posts, setPosts, loading } = usePagination(postService.getUserPosts, userId)
  const updatePostsList = postId => setPosts(posts.filter(post => post._id !== postId))
  
  const getUser = async () => {
    const currentUser = await userService.getUser(userId)
    setCurrentUser(currentUser)
    setIsUser(user?.id === currentUser.id)
    setFollowing(!isUser && user?.following.find(user => user === currentUser.id))
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
    getUser()
    window.scrollTo({top: 0})
  }, [userId, user])


  return (
    <>
    { loading ? <Loader /> :
      <main>
        <div className="container max-w-[1000px] min-h-screen">
          <div className="w-full flex flex-col items-center space-y-8 mb-20">
          {edit ? <AddImage size={'small'} defaultImage={user.image?.url} setImageData={setImage} /> 
                : <> {!currentUser?.image ? <FaUser className="h-20 w-20 sm:h-40 sm:w-40"/>
                                          : <img className="h-[250px] w-[250px] object-cover rounded-full" 
                                                 src={currentUser?.image?.url}/> } </>
          }

            <div className="flex flex-col items-center justify-between space-y-8">
              <div>
                <h1 className="mb-4">{currentUser?.name}</h1>
                { edit ? <textarea className="resize-none w-full h-44 sm:h-24 
                                              p-4 bg-grey-light dark:bg-black" 
                                   maxLength="200"
                                   placeholder={user.description ? user.description : 'No Description'}
                                   onChange={e => setDesc(e.target.value)} />
                       : <> {currentUser?.description ? <p>{currentUser?.description}</p> 
                                                      : <p>No description</p>}</>
                }
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaUsers className="h-5 w-5" />
                    <p>{currentUser?.followers.length}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiDetail className="h-5 w-5" />
                    <p>{posts?.length}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiCommentDetail className="h-5 w-5" />
                    <p>{posts?.length}</p>
                  </div>
                </div>
                <div>
                { isUser ? <div className="flex space-x-6">
                  { !edit ? <button className="btn dim-blue-btn" onClick={openEdit}>Edit</button> 
                          : <>
                              <button className="btn dim-red-btn" onClick={displayDelete}>Delete</button>
                              <button className="btn neutral-btn" onClick={closeEdit}>Discard</button>
                              <button className="btn dim-green-btn" onClick={updateUser}>Save</button>
                            </>
                  }
                           </div>
                         : <button className="btn pink-btn" onClick={e => follow(e)}>Follow</button>
                }
                </div>
              </div>
            </div>
          </div>
          
          { !posts?.length ?
            <div className="w-full flex justify-center mt-20">
              <p className="text-2xl">wow such empty ...</p>
            </div>
            :
            <Pagination page={page} 
                        setPage={setPage} 
                        total={total} 
                        pages={pages} 
                        posts={posts} />
          }
        </div>
      </main>
    }
    </>
  )
}


export default Dashboard