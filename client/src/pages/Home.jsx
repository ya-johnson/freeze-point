import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useAuthModal } from '../hooks'
import { useUserStore, useTopicsStore } from '../store'
import { postService } from '../services'
import { PostCard, Loader, Dropdown } from '../componets'
import { GiPentarrowsTornado } from 'react-icons/gi'


const Home = ({ topicName }) => {

  const user = useUserStore(state => state.user)
  const topics = useTopicsStore(state => state.topics)
  const [posts, setPosts] = useState()
  const [topic, setTopic] = useState(topicName)
  const [topicPosts, setTopicPosts] = useState()
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useLocation()
  const { toggleAuthModal } = useAuthModal()

  const getPosts = async () => {
    const posts = await postService.getPosts()
    setPosts(posts)
    setLoading(false)
  }

  const getTopicPosts = async () => {
    const topicPosts = await postService.getTopicPosts(topic)
    setTopicPosts(topicPosts)
    setLoading(false)
  }

  const createPost = (e) => {
    if (!user) {
      toggleAuthModal(e)
      return
    }

    setLocation('/create-post')
  }

  useEffect(() => {
    setTopic(topicName)
  }, [topicName])

  useEffect(() => {
    !topic ? setTopicPosts(null) : getTopicPosts()
    window.scrollTo({top: 0})
  }, [topic])

  useEffect(() => {
    getPosts()
  },[])


  return (
    <main>
    { loading ? <Loader /> : 
      <div className="container flex justify-between min-h-screen">
        <div className="grow brd lg:pr-8 lg:border-r">
          <div className="flex items-center justify-between pb-8 brd border-b">
            <h2>Latest Posts</h2>
            <button className="hidden btn pink-btn lg:block"
                    onClick={e => createPost(e)}>Create Post
            </button>
            <Dropdown type={'select'}
                      className={'lg:hidden'}
                      title={'Topic:'}
                      list={topics}
                      setItem={setTopic} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 my-10">
          { topicPosts ? topicPosts.map(post => <PostCard post={post} />)
                       : posts.map(post => <PostCard post={post} />) }
          </div>
        </div>

        <div className="hidden lg:block lg:max-w-[200px] xl:max-w-xs pl-8 py-2">
          <div className="flex items-end justify-between pb-8">
            <div className="flex items-center space-x-2 text-lg">
              <GiPentarrowsTornado className="h-6 w-6"/>
              <span>Topics</span>
            </div>
            <button className="text-sm"
                    onClick={() => setTopic(null)}>Clear
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
          { topics.map(topicItem => {
              return (
                <button className={`btn neutral-btn py-1 px-2 text-sm 
                                    ${topicItem === topic && 'neutral-active'}`}
                        onClick={() => topicItem === topic ? setTopic(null) : setTopic(topicItem)}>{topicItem}
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

