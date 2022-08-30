import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { toast } from 'react-toastify'
import { notify } from '../utils'
import { useUserStore } from '../store'
import { authService ,postService } from '../services'
import { createHtml } from '../utils'
import { Loader, PostCard } from '../componets'
import { BiUpvote, BiCommentDetail } from 'react-icons/bi'


const Post = ({ postId }) => {

  const user = useUserStore(state => state.user)
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState()
  const [postContent, setPostContent] = useState()
  const [comment, setComment] = useState()
  const [likes, setLikes] = useState()
  const [comments, setComments] = useState()
  const [userPosts, setUserPosts] = useState()
  const [topicPosts, setTopicPosts] = useState()

  
  const initPage = async () => {
    const post = await postService.getPost(postId)
    setPost(post)
    setPostContent(createHtml(post.content))
    setLikes(post.likes)
    setComments(post.comments)

    const userPostsData = await postService.getUserPosts(post.userId)
    const userPosts = userPostsData
                        .filter(userPost => userPost._id !== post._id)
                        .slice(0,2)
    setUserPosts(userPosts)

    const topicPostsData = await postService.getTopicPosts(post.topic)
    const topicPosts = topicPostsData
                        .filter(topicPost => topicPost._id !== post._id && topicPost.userId !== post.userId)
                        .slice(0,2)
    setTopicPosts(topicPosts)

    setLoading(false)
  }

  const commentPost = async (e) => {
    if (!user) {
      authService.toggleAuthModal(e)
      return
    }

    if (comment.length < 5) {
      toast.error('Comment must be at least 5 chracters', notify.settings)
      return
    }

    console.log(comment)

    const comments = await postService.commentPost(user.token, post._id, user.id, user.name, comment)
    setComments(comments)
  }

  const likePost = async (e) => {
    if (!user) {
      authService.toggleAuthModal(e)
      return
    }

    const likes = await postService.likePost(user.token, post._id, user.id)
    setLikes(likes)
  }


  useEffect(() => {
    
    setLoading(true)
    initPage()
    window.scrollTo({top: 0})
    
  }, [postId])


  return (
    <> 
    { loading ? <Loader /> :
    <div className="post container">
      <div className="post-main">

        <span className="text-blue">{post.topic}</span>
        <h1>{post.title}</h1>
        <Link href={`/users/${post.username}`}>
          <a className="post-user-link">post.username</a>
        </Link>
        
        <div className="post-content" dangerouslySetInnerHTML={postContent}></div>

        <div className="post-notes post-inters">
          <textarea className="post-comment" 
                      maxLength="200" 
                      onChange={(e => setComment(e.target.value))}
                      placeholder="Your comment goes here ...">
          </textarea>

          <div className="post-notes-wrapper">
            <div className="post-notes">
              <div className="post-notes-header-comments">
                <span>{ comments.length }</span>
                <BiCommentDetail className="icon" />
              </div>
              <div className="post-notes-header-likes">
                <span>{ likes.length }</span>
                <BiUpvote className="icon" onClick={e => likePost(e)} />
              </div>
            </div>
            <button className="btn pink-btn"
                    onClick={e => commentPost(e)}>Add comment
            </button>
          </div>
        </div>

          { comments.length > 0 && 
          <div className="post-comments">
            {comments.map(comment => {
              return (
                <div className="post-comment-card">
                  <p>{comment.body}</p>
                  <div className="post-comment-info">
                    <Link href={`/users/${comment.userId}`}>
                      <a>{comment.username}</a>
                    </Link>
                    <span>{comment.date}</span>
                  </div>
                </div>
              )
            })}
 
          </div>}
      </div> 
      
      
      <div className="post-suggestions">
        { userPosts.length > 0 &&
        <div className="post-sugg-user">
          <h3>More posts from username</h3>
          <div className="post-sugg-wrapper">
            { userPosts && userPosts.map(post => {
              return (
                <PostCard post={post} />
              )
            })}
          </div>
        </div>}
        
        { topicPosts.length > 0 &&
        <div className="post-sugg-topic">
          <h3>{`More posts from ${post.topic}`}</h3>
          <div className="post-sugg-wrapper">
            {  topicPosts.map(post => {
              return (
                <PostCard post={post} />
              )
            })}
          </div>
        </div>}
      </div>

    </div>}

    </>
  )
}


export default Post