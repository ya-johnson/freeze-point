import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useUserStore, useTopicsStore } from '../store'
import { authService, postService } from '../services'
import { PostCard, Loader } from '../componets'
import { GiPentarrowsTornado } from 'react-icons/gi'


const Home = () => {

  const user = useUserStore(state => state.user)
  const topics = useTopicsStore(state => state.topics)
  const [posts, setPosts] = useState()
  const [topic, setTopic] = useState()
  const [topicPosts, setTopicPosts] = useState()
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useLocation()

  const getPosts = async () => {
    const posts = await postService.getPosts()
    setPosts(posts)
    setLoading(false)
  }

  const getTopicPosts = async (topicItem) => {
    if (topicItem === topic) {
      setTopic(null)
      setTopicPosts(null)
    } 
    else {
      setLoading(true)
      setTopic(topicItem)
      const topicPosts = await postService.getTopicPosts(topicItem)
      setTopicPosts(topicPosts)
      setLoading(false)
    }
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
    <main>
    { loading ? <Loader /> : 
      <div className="container flex justify-between py-8 min-h-screen">
        <div className="grow pr-8 border-r border-solid border-black dark:border-grey-dark">
          <div className="flex items-center justify-between pb-8 brd border-b">
            <h2>Latest Posts</h2>
            <button className="btn pink-btn"
                    onClick={e => createPost(e)}>Create Post
            </button>
          </div>

          <div className="grid grid-cols-3 gap-10 my-10">
          { topicPosts ? topicPosts.map(post => <PostCard post={post} />)
                       : posts.map(post => <PostCard post={post} />)
          }
          </div>
        </div>

        <div className=" max-w-xs pl-8 py-2">
          <div className="flex items-end justify-between pb-8">
            <div className="flex items-center space-x-2 text-lg">
              <GiPentarrowsTornado className="h-6 w-6"/>
              <span>Topics</span>
            </div>
            <button className="text-sm"
                    onClick={() => getTopicPosts(topic)}>Clear
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
          { topics.map(topicItem => {
              return (
                <button className={`btn neutral-btn py-1 px-2 text-sm 
                                    ${topicItem === topic && 'neutral-active'}`}
                        onClick={() => getTopicPosts(topicItem)}>{topicItem}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    }
    </main>
  )
}


export default Home

