import { Link } from 'wouter'
import { useTopicsStore } from '../store'
import { usePagination } from '../hooks'
import { postService } from '../services'
import { Pagination, PostCard, Loader, Latest } from '../componets'

// user feed (latest)

const Home = () => {

  const topics = useTopicsStore(state => state.topics)
  const { page, setPage, total, pages, posts, loading } = usePagination(postService.getPosts)


  return (
    <main>
      <section className="min-h-[65vh] container flex flex-col items-center py-14 space-y-14">
        <div className="font-covered text-center">
          <h1 className="text-8xl uppercase">Knowledege For All</h1>
          <p className="text-3xl">Dedicated to discovery and an original edit,</p>
          <p className="text-3xl">Library as a collective, built by the people that make us - and you.</p>
        </div>
        <div className="w-2/3 flex flex-wrap items-center justify-center space-x-4">
        {topics.map(topic => {
            return (
              <Link href={`/p/${topic}`} >
                <a key={topic} className="p-2 brd border mb-4 hover:bg-blue-light dark:hover:text-black">{topic}</a>
              </Link>
            )
          })
        }
        </div>
      </section>

      <section className="container min-h-screen">
        <Latest />

        {loading ? <Loader /> :
          <Pagination page={page} setPage={setPage} total={total} pages={pages}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
              {posts &&  posts.map(post => <PostCard key={post._id} post={post} />) }
            </div>
          </Pagination>
        }
      </section>
    </main>
  )
}


export default Home

