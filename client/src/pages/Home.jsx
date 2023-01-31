import { Link } from 'wouter'
import { useTopicsStore } from '../store'
import { usePagination } from '../hooks'
import { postService } from '../services'
import { Pagination, Loader } from '../componets'

// feed (latest, following)

const Home = () => {

  const topics = useTopicsStore(state => state.topics)
  const { page, setPage, total, pages, posts, loading } = usePagination(postService.getPosts)


  return (
    <main>
      <section className="min-h-[65vh] container flex flex-col items-center py-14 space-y-14">
        <div className="font-covered text-center">
          <h1 className="md:text-8xl uppercase">Knowledege For All</h1>
          <p className="md:text-3xl">Dedicated to discovery and an original edit,</p>
          <p className="md:text-3xl">Library as a collective, built by the people that make us - and you.</p>
        </div>
        <div className="md:w-2/3 flex flex-wrap items-center justify-center gap-4">
        {topics.map(topic => {
            return (
              <Link href={`/p/${topic}`} >
                <a key={`home-${topic}`} className="btn neutral-btn">{topic}</a>
              </Link>
            )
          })
        }
        </div>
      </section>

      <section className="container min-h-screen">
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


export default Home

