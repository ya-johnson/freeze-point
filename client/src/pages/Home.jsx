import { Feed } from '../componets'


const Home = () => {

  return (

    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>a space of shared knowladge</h1>
          <p>Read and Write about what matters to you (respcetfully), <br/>
              but in more then 100 words
          </p>
        </div>
      </div>
     <Feed />
    </div>



  
  )
}


export default Home