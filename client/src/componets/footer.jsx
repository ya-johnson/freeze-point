import { Link } from 'wouter'
import { GiFrozenArrow } from 'react-icons/gi'
import { useTopicsStore } from '../store'
import { algs } from '../utils'

const Footer = () => {

  const topics = useTopicsStore(state => state.topics)
  const topicsChunks = algs.spliceToChunks(topics, 4)

  const backToTop = () => {
    window.scrollTo({top: 0})
  }


  return (
    <footer className="py-20 bg-grey dark:bg-black-dark">
      <div className="container flex items-center justify-between">
        <div className="flex space-x-12">
          <Link href='/'>
            <a><GiFrozenArrow className="h-10 w-10 hover:text-pink"/></a>
          </Link>

          <div className="flex space-x-8">
            { topicsChunks.map(topics => {
              return (
              <div className="flex flex-col space-y-1"> 
                {topics.map(topic => {
                  return (
                    <Link href={`/topics/${topic}`} >
                      <a className="footer-topic-link">{topic}</a>
                    </Link>
                  )
                })}
              </div>)
            })
            }
          </div>
        </div>

        <div className="cursor-pointer p-4 w-28 h-28 flex flex-col  justify-center text-lg
                      font-medium bg-black text-grey-light dark:bg-white dark:text-black"
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