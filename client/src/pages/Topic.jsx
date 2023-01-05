import { usePagination } from '../hooks'
import { postService } from '../services'
import { Pagination, Loader } from '../componets'
import { SiSlashdot } from 'react-icons/si'

const Topic = ({ topic }) => {

  const { page, setPage, total, pages, posts, loading } = usePagination(postService.getTopicPosts, topic)


  return (
    <main>
      <section className="container min-h-screen">
        <div className="flex flex-col items-center justify-center space-y-6 my-24">
          <SiSlashdot className="text-pink h-60 w-60" />
          <h1 className="font-covered">{topic}</h1>
        </div>
        
        {loading ? <Loader /> : <Pagination page={page} 
                                            setPage={setPage} 
                                            total={total} 
                                            pages={pages} 
                                            posts={posts} />
        }

      </section>
    </main>
  )
}


export default Topic

