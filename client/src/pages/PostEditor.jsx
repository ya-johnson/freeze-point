import { useState, useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'
import { useUserStore, useTopicsStore } from '../store'
import { postService } from '../services'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Dropdown, AddImage, Loader } from '../componets'
import { draft } from '../utils'


const PostEditor = ({ postId }) => {

  const user = useUserStore(state => state.user)
  const topics = useTopicsStore(state => state.topics)
  const [editPost, setEditPost] = useState()
  const [titleState, setTitleState] = useState()
  const [editorState, setEditorState] = useState(!postId ? () => EditorState.createEmpty() : null)
  const [convertedJson, setConvertedJson] = useState()
  const [imageData, setImageData] = useState()
  const [topic, setTopic] = useState()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useLocation()
  const [match, params] = useRoute(postId ? '/users/posts/edit-post/:post' : '/create-post')

  const onEditorChange = (state) => {
    setEditorState(state)
    setConvertedJson(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }

  const getPost = async () => {
    const post = await postService.getPost(postId)
    setEditPost(post)
    setTitleState(post.title)
    setTopic(post.topic)
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(post.content))))
    setLoading(false)
  }

  const savePost = async () => {
    const createdPost = {
      userId: user.id,
      username: user.name,
      image: imageData || editPost.image,
      title: titleState,
      content: convertedJson,
      topic: topic,
    }

    if (editPost) {
      console.log(createdPost.image)
      const post = await postService.updatePost(user.token, postId, createdPost)
      setLocation(`/posts/${post._id}`)
    } else {
      const post = await postService.PostEditor(user.token, createdPost)           
      setLocation(`/posts/${post._id}`)
    }
  }


  useEffect(() => {
    if (!user) {
      setLocation('/')
      return
    }
    if (postId) {
      setLoading(true)
      getPost()
    }
  }, [user])

          
  return (
    
    <main className="container flex items-center justify-center">
    { loading ? <Loader /> :
      <div className="max-w-[800px] w-full">
        <div className="mb-10">
          <AddImage defaultImage={editPost && editPost.image.url} setImageData={setImageData} />
  
          <div className="flex flex-col justify-between space-y-6 my-8">
            <div className="post-editor-header-title">
              <h2>{titleState ? titleState : 'Title'}</h2>
              <input type="text" 
                     className="btn post-editor-title"
                     placeholder="Title"
                     value={titleState}
                     onChange={(e => setTitleState(e.target.value))} />
            </div>
              
            <div className="post-editor-options">
              <Dropdown type={'select'}
                        title='Topic' 
                        list={topics} 
                        defaultItem={postId && topic}
                        setItem={setTopic} />
  
              <button className="btn dim-green-btn" 
                      onClick={savePost}>Save
              </button>
            </div>
              
          </div>
        </div>
  
        <Editor editorState={editorState}
                onEditorStateChange={onEditorChange}
                toolbar={draft.toolbarOptions}
                editorClassName="post-editor-block"
                wrapperClassName="post-editor-wrapper"
                toolbarClassName="post-editor-toolbar" />
      </div>
    }
    </main>
  )
}


export default PostEditor