import { Router, Route } from 'wouter'
import { useUserStore } from './store'
import { Nav, AuthModal, Footer } from './componets'
import { Home, Topic, Dashboard, Post, PostEditor } from './pages'
import { ToastContainer, Slide } from 'react-toastify'
import '../src/style/index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


const App = () => {

  const user = useUserStore(state => state.user)

  return (
    <Router>
      <ToastContainer position='top-center'
                      className='toast-container'
                      toastClassName='toast-body'
                      transition={Slide} 
                      closeOnClick={false} />
      
      {!user && <AuthModal />}
      <Nav />

      <Route path='/' component={Home} />
      <Route path='/p/:topic'>
        { params => <Topic topic={params.topic} /> }
      </Route>
      <Route path='/create-post' component={PostEditor} />
      <Route path='/posts/:post'>
        { params => <Post postId={params.post} /> }
      </Route>
      <Route path='/users/:user'>
        { params => <Dashboard userId={params.user} /> }
      </Route>
      <Route path='/users/posts/edit-post/:post'>
        { params => <PostEditor postId={params.post} /> }
      </Route>

      <Footer />
    </Router>
  )
}


export default App
