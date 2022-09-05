import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useUserStore, useTopicsStore } from '../store'
import { postService } from '../services'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Dropdown, AddImage } from '../componets'
import { draft } from '../utils'



const CreatePost = () => {

  const user = useUserStore(state => state.user)
  const topics = useTopicsStore(state => state.topics)
  const [location, setLocation] = useLocation()

  const [titleState, setTitleState] = useState()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedJson, setConvertedJson] = useState()
  const [imageData, setImageData] = useState()
  const [topic, setTopic] = useState()

  const onEditorChange = (state) => {
    setEditorState(state)
    setConvertedJson(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }

  const savePost = async () => {
    const createdPost = {
      userId: user.id,
      username: user.name,
      image: imageData,
      title: titleState,
      content: convertedJson,
      topic: topic,
    }

    const post = await postService.createPost(user.token, createdPost)           
    setLocation(`/posts/${post._id}`)
  }


  useEffect(() => {
    if (!user) {
      setLocation('/')
    }
  }, [user])

          
  return (
    
    <div className="container flex flex-col items-center">
      <div className="post-edit">

        <div className="post-editor-header">

          <AddImage setImageData={setImageData} />

          <div className="post-editor-header-right">
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
                        setItem={setTopic} />

              <button className="btn post-editor-save-btn" 
                      onClick={savePost}>Publish
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
    </div>
    
  )
}


export default CreatePost