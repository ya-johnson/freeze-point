import { Link } from 'wouter'
import { useTopicsStore } from '../store'
import { useShow } from '../hooks'
import { RiCloseCircleFill, RiMenuFill } from 'react-icons/ri'


const MenuBox = () => {

  const topics = useTopicsStore(state => state.topics)
  const { show, toggleShow } = useShow()


  return (
    <div className="relative h-6 w-6">
      {show ? <RiMenuFill className="absolute top-0 right-0 icon z-50" 
                          onClick={toggleShow}/>
            : <RiCloseCircleFill className="absolute top-0 right-0 icon z-50" 
                                 onClick={toggleShow}/>
      }
 
      <div className={`max-w-[600px] absolute -top-2 -right-2 flex space-x-6
                       px-6 pt-12 pb-4 brd border bg-white dark:bg-black-dark z-20 ${show}`}>
    
        <div className="flex flex-col space-y-1">
          <p className="text-xl font-semibold">Topics</p>
            {topics.map(topic => {
              return (
                <Link href={`/p/${topic}`} >
                  <a key={`footer-${topic}`} className="footer-topic-link">{topic}</a>
                </Link>
              )
            })}
        </div>
        <div className="pl-4 brd border-l-2 border-dotted">
          <p>About</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}


export default MenuBox