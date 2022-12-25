import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { usePagination } from '../hooks'
import { postService } from '../services'
import { Pagination, PostCard, Dropdown, Loader } from '../componets'


const Home = () => {

  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useLocation()
  // const newPosts = usePagination(getPosts)

  const getPosts = async () => {
    setLoading(true)
    const posts = await postService.getPosts()
    setPosts(posts)
    setLoading(false)
    // return posts
  }

  useEffect(() => {
    getPosts()
    window.scrollTo({top: 0})
  },[])


  return (
    <main>
      <section className="container min-h-screen">

        <div className="relative flex items-center justify-center">
          <div className="py-2 px-4 brd border z-10 bg-white dark:bg-black-dark">
            <p className="font-covered text-2xl">Latest Posts</p>
          </div>
          <div className="w-1/2 h-[1px] absolute top-1/2 border-t-2 border-dotted"></div>
        </div>

        {loading ? <Loader /> : 
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 my-10">
            {posts &&  posts.map(post => <PostCard key={post._id} post={post} />) }
          </div>
        }

      </section>
    </main>
  )
}


export default Home

