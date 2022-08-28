import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useUserStore, useTopicsStore } from '../store'
import { authService, postService } from '../services'
import { PostCard, Loader } from './index'
import { GiPentarrowsTornado } from 'react-icons/gi'


const Feed = () => {

  const topics = useTopicsStore(state => state.topics)

  const user = useUserStore(state => state.user)

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState()
  const [topic, setTopic] = useState()
  const [postsByTopic, setPostsByTopic] = useState()
  const [location, setLocation] = useLocation()


  const getPosts = async () => {
    const posts = await postService.getPosts()
    setPosts(posts)
    setLoading(false)
  }

  const sortByTopic = (topicName) => {
    if (topicName === topic) {
      clearTopic()
    }
    setTopic(topicName)
    const postsByTopic = posts.filter(post => post.topic === topic)
    setPostsByTopic(postsByTopic)
  }

  const clearTopic = () => {
    setTopic(null)
    setPostsByTopic(null)
  }

  const createPost = (e) => {
    if (!user) {
      authService.toggleAuthModal(e)
      return
    }

    setLocation('/create-post')
  }


  useEffect(() => {

    getPosts()

  },[])


  return (
    <div className="feed container">
      { loading ? <Loader/> :        
        <>
          <div className="feed-main">
            <div className="feed-header">
              <h2>Latest Posts</h2>

              <div className="feed-header-right">
                <button className="btn pink-btn"
                        onClick={e => createPost(e)}>Create Post
                </button>
              </div>

            </div>

            <div className="feed-main-posts">
              { topic ?
                  postsByTopic.map(post => {
                    return (
                      <PostCard post={post} />
                    )
                  })
                :
                  posts.map(post => {
                    return (
                      <PostCard post={post} />
                    )
                  })
              }
            </div>
          </div>

          <div className="feed-right">
            <div className="feed-right-header">
              <div className="feed-right-header-title">
                <GiPentarrowsTornado />
                <span>Topics</span>
              </div>
              <button className="feed-topcics-clear-btn"
                      onClick={clearTopic}>Clear
              </button>
            </div>

            <div className="feed-right-topics">
            { topics.map(topicItem => {
              return (
                <button className={`btn neutral-btn ${topicItem === topic && 'neutral-active'}`}
                        onCick={() => sortByTopic(topicItem.name)}>{topicItem}
                </button>
              )
            })}
            </div>
          </div>  
        </>
      }
    </div>
  )
}


export default Feed

