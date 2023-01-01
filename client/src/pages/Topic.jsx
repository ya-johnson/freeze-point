import { usePagination } from '../hooks'
import { postService } from '../services'
import { Pagination, PostCard, Loader, Latest } from '../componets'
import { SiSlashdot } from 'react-icons/si'

const Topic = ({ topic }) => {

  const { page, setPage, total, pages, posts, loading } = usePagination(postService.getTopicPosts, topic)


  return (
    <main>
      <section className="container min-h-screen">
        <div className="flex flex-col items-center justify-center space-y-6 my-24">
          <SiSlashdot className="text-pink h-60 w-60" />
          <h1>{topic}</h1>
        </div>
        <Latest />
        
        {loading ? <Loader /> : 
          <Pagination page={page} setPage={setPage} total={total} pages={pages}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 my-10">
              {posts && posts.map(post => <PostCard key={post._id} post={post} />)}
            </div>
          </Pagination>
        }

      </section>
    </main>
  )
}


export default Topic

