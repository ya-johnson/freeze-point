import { Link } from 'wouter'
import { GiFrozenArrow } from 'react-icons/gi'
import { useTopicsStore } from '../store'

const Footer = () => {

  const topics = useTopicsStore(state => state.topics)

  const backToTop = () => {
    window.scrollTo({top: 0})
  }

  return (
    <div className="footer">
      <div className="container flex justify-between">

        <div className="footer-nav">
          <Link href='/'>
            <a>
              <div className="logo">
                <GiFrozenArrow />
                <h1>Freeze Point</h1>
              </div> 
            </a>
          </Link>
        </div>

        <div className="footer-topics">
          { topics.map(topic => {
            return (
              <Link href={`/topics/${topic}`} >
                <a className="footer-topic-link">{topic}</a>
              </Link>
            )
          })}
        </div>

        <div className="footer-go-top"
            onClick={backToTop}>
          <span>Back</span>
          <span>To</span>
          <span>Top</span>
        </div>
      </div>
    </div>
  )
}


export default Footer