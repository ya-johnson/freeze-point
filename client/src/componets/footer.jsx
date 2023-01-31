import { Link } from 'wouter'
import { useTopicsStore } from '../store'
import { algs } from '../utils'


const Footer = () => {

  const topics = useTopicsStore(state => state.topics)
  const topicsChunks = algs.spliceToChunks(topics, 4)
  const backToTop = () => window.scrollTo({top: 0})

  return (
    <footer className="py-20 mt-28 bg-white dark:bg-black-dark brd border-t">
      <div className="container flex justify-between space-x-4">
        <div className="flex flex-col max-w-[200px] md:max-w-[500px] space-y-4">
          <Link href='/'>
            <a className="font-covered text-3xl hover:text-pink-light">freeze point.</a>
          </Link>

          <div className="flex flex-wrap gap-4">
          {topicsChunks.map(topics => {
            return (
              <div className="flex flex-col space-y-1">
              {topics.map(topic => {
                return (
                  <Link href={`/p/${topic}`} >
                    <a key={`footer-${topic}`} className="footer-topic-link">{topic}</a>
                  </Link>
                )
              })}
              </div>
            )
          })}

          </div>
        </div>

        <div className="cursor-pointer p-4 w-28 h-28 flex flex-col justify-center text-3xl leading-7
                        font-covered bg-black text-white dark:bg-white dark:text-black"
             onClick={backToTop}>
          <span>Back</span>
          <span>To</span>
          <span>Top</span>
        </div>
      </div>
    </footer>
  )
}


export default Footer