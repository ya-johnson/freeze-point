import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useUserStore, useTopicsStore } from '../store'
import { postService } from '../services'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Dropdown } from '../componets'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'


const CreatePost = () => {

  const user = useUserStore(state => state.user)
  const topics = useTopicsStore(state => state.topics)
  const [location, setLocation] = useLocation()

  const [titleState, setTitleState] = useState()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [convertedJson, setConvertedJson] = useState()
  const [converted, setConverted] = useState()
  const [topic, setTopic] = useState()


  const createHtml = (html) => {
    const postContent = draftToHtml(convertFromRaw(JSON.parse(html)))
    return {
      __html: DOMPurify.sanitize(postContent)
    }
  }

  const onEditorChange = (state) => {
    setEditorState(state)
    setConverted(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    setConvertedJson(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  }

  const savePost = async () => {
    const createdPost = {
      userId: user.id,
      title: titleState,
      content: convertedJson,
      topic: topic,
    }
    const post = await postService.createPost(user.token, createdPost)           
    setLocation(`/posts/${post._id}`)
  }

  const toolbarOptions = {
    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
    inline: {
      inDropdown: false,
      className: 'post-editor-toolbar-inline',
      options: ['bold', 'italic', 'underline', 'strikethrough']
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H2', 'H3', 'Blockquote'],
      dropdownClassName: 'post-editor-toolbar-dropdown',
    },
    list: {
      inDropdown: false,
      className: undefined,
      options: ['unordered', 'ordered']
    },
    link: {
      inDropdown: false,
      className: 'post-editor-toolbar-item',
      popupClassName: undefined,
      dropdownClassName: undefined,
      showOpenOptionOnHover: true,
      defaultTargetOption: '_blank',
      options: ['link', 'unlink']
    },
    emoji: {
      className: 'post-editor-toolbar-item',
      popupClassName: undefined,
    },
    history: {
      className: 'post-editor-toolbar-item',
      options: ['undo', 'redo']
    },
  }

  useEffect(() => {
    if (!user) {
      setLocation('/')
    }

  }, [user])

          
  return (

    <div className="post-edit container">

      <div className="post-editor-header">
        <h2>Create Post</h2>
        <button className="btn post-editor-save-btn" 
                onClick={savePost}>Publish
        </button>
      </div>
      
      <div className="post-editor-options">
        <input type="text" 
              className="btn post-editor-title"
              placeholder="Title"
              value={titleState}
              onChange={(e => setTitleState(e.target.value))} />

        <Dropdown type={'select'}
                  title='Topic' 
                  list={topics} 
                  setItem={setTopic} />
      </div>
    

      <Editor editorState={editorState}
              onEditorStateChange={onEditorChange}
              toolbar={toolbarOptions}
              editorClassName="post-editor-block"
              wrapperClassName="post-editor-wrapper"
              toolbarClassName="post-editor-toolbar" />

      
      


    </div>

  )
}


export default CreatePost