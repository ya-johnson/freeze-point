import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { usePagination } from '../hooks'
import { postService } from '../services'
import { Pagination, PostCard, Dropdown, Loader } from '../componets'


const Topic = ({ topic }) => {

  const [topicPosts, setTopicPosts] = useState()
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useLocation()
  // const newPosts = usePagination(getPosts)

  const getTopicPosts = async () => {
    setLoading(true)
    const topicPosts = await postService.getTopicPosts(topic)
    setTopicPosts(topicPosts)
    setLoading(false)
  }


  useEffect(() => {
    getTopicPosts()
  },[topic])


  return (
    <main>
      <section className="container min-h-screen">

        <div className="relative flex items-center justify-center">
          <div className="py-2 px-4 brd border border-pink-light z-10 bg-white dark:bg-black-dark">
            <p className="font-covered text-2xl">Latest on {topic}</p>
          </div>
          <div className="w-1/2 h-[1px] absolute top-1/2 border-t-2 border-dotted"></div>
        </div>
        
        {loading ? <Loader /> : 
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 my-10">
            {topicPosts && topicPosts.map(post => <PostCard key={post._id} post={post} />)}
          </div>
        }

      </section>
    </main>
  )
}


export default Topic

