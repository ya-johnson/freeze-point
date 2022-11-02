import { Router, Route } from 'wouter'
import { ToastContainer, Slide } from 'react-toastify'
import { Nav, AuthModal, Footer } from './componets'
import { Home, Dashboard, Post, CreatePost } from './pages'
import '../src/style/index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


const App = () => {

  return (
    <Router>
      <ToastContainer position='top-center'
                      theme='colored' 
                      transition={Slide} 
                      draggable={true}
                      closeOnClick={true} />
      <AuthModal />
      <Nav />

      <Route path='/' component={Home} />
      <Route path='/create-post' component={CreatePost} />
      <Route path='/posts/:post'>
        { params => <Post postId={params.post} /> }
      </Route>
      <Route path='/users/:user'>
        { params => <Dashboard userId={params.user} /> }
      </Route>
      <Route path='/posts/edit-post/:post'>
        { params => <CreatePost postId={params.post} /> }
      </Route>

      <Footer />
    </Router>
  )
}


export default App
