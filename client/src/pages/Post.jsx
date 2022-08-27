import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useUserStore } from '../store'
import { postService } from '../services'
import { createHtml } from '../utils'
import { Loader } from '../componets'
import { BiUpvote, BiCommentDetail } from 'react-icons/bi'


const Post = ({ postId }) => {


  const user = useUserStore(state => state.user)
  const [post, setPost] = useState()
  const [postContent, setPostContent] = useState()
  const [comment, setComment] = useState()
  const [loading, setLoading] = useState(true)


  const getPost = async () => {
    const post = await postService.getPost(postId)
    setPost(post)
    setPostContent(createHtml(post.content))
    setLoading(false)
  }

  const addComment = async () => {
    if (!user) {
      toggelAuthModal()
      return
    }

    const postRaw = await postService.commentPost(user.token, postId, {userId: user.id, comment})
    const post = createHtml(postRaw)
    setPost(post)
  }

  const likePost = async () => {
    if (!user) {
      toggelAuthModal()
      return
    }

    const postRaw = await postService.likePost(user.token, post.id)
    const post = createHtml(postRaw)
    setPost(post)
  }


  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="post container">
      { loading ? <Loader /> :

      <div className="post-main">

        <span className="text-blue">{post.topic}</span>
        <h1>{post.title}</h1>
        <Link href={`/users/${post.username}`}>
          <a className="post-user-link">post.username</a>
        </Link>
        
        <div className="post-content" dangerouslySetInnerHTML={postContent}></div>

        <div className="post-notes">
          <div className="comments grow">
            <textarea classname="comment w-full" 
                      maxLength="200" 
                      onChange={(e => setComment(e.target.value))}
                      value={comment}
                      disabled>
            </textarea>
          </div>

          <div className="post-notes">
            <div className="post-notes-header-comments">
              <span>{ post.comments.length }</span>
              <BiCommentDetail className="icon" onClick={likePost}/>
            </div>
            <div className="post-notes-header-likes">
              <span>{ post.likes.length }</span>
              <BiUpvote className="icon" onClick={addComment} />
            </div>
          </div>
        </div>

      </div> }

      <div className="post-suggestions">

      </div>

    </div>
  )
}


export default Post