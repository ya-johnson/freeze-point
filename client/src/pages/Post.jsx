import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { useAuthModal } from '../hooks'
import { useUserStore } from '../store'
import { postService } from '../services'
import { Loader, PostCard } from '../componets'
import { toast } from 'react-toastify'
import { draft, toastify } from '../utils'
import { BiUpvote, BiCommentDetail } from 'react-icons/bi'


const Post = ({ postId }) => {

  const user = useUserStore(state => state.user)
  const [post, setPost] = useState()
  const [postContent, setPostContent] = useState()
  const [comment, setComment] = useState()
  const [likes, setLikes] = useState()
  const [comments, setComments] = useState()
  const [userPosts, setUserPosts] = useState()
  const [topicPosts, setTopicPosts] = useState()
  const [loading, setLoading] = useState(true)
  const { toggleAuthModal } = useAuthModal()
  
  const initPage = async () => {
    setLoading(true)
    
    const post = await postService.getPost(postId)
    setPost(post)
    setPostContent(draft.createHtml(post.content))
    setLikes(post.likes)
    setComments(post.comments)

    const userPostsData = await postService.getUserPosts(post.userId)
    const userPosts = userPostsData.docs.filter(userPost => userPost._id !== post._id).slice(0,2)
    setUserPosts(userPosts)

    const topicPostsData = await postService.getTopicPosts(post.topic)
    const topicPosts = topicPostsData.docs.filter(toP => toP._id !== post._id && toP.userId !== post.userId).slice(0,2)
    setTopicPosts(topicPosts)

    setLoading(false)
  }

  const commentPost = async (e) => {
    if (!user) {
      toggleAuthModal(e)
      return
    }

    if (comment.length < 5) {
      toast.error('Comment must be at least 5 chracters', toastify.autoClose)
      return
    }

    const comments = await postService.commentPost(user.token, post._id, user.id, user.name, comment)
    setComments(comments)
  }

  const likePost = async (e) => {
    if (!user) {
      toggleAuthModal(e)
      return
    }

    const likes = await postService.likePost(user.token, post._id, user.id)
    setLikes(likes)
  }


  useEffect(() => {
    initPage()
    window.scrollTo({top: 0})
  }, [postId])


  return (
    <> 
    { loading ? <Loader /> :
    <main>
      <div className="container">
        <div className="mx-auto max-w-[800px]">

          <div className="space-y-1 sm:space-y-2">
            <div className="space-y-1 sm:space-y-2">
              <Link href={`/topics/${post.topic}`}>
                <a className="text-blue">{post.topic}</a>
              </Link>
              <h1>{post.title}</h1>
            </div>
            <div className="flex items-end justify-between pb-4">
              <Link href={`/users/${post.userId}`}>
                  <a className="capitalize text-lg hover:text-pink">{post.username}</a>
              </Link>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

          { post.image && <img className="w-full" src={post.image.url}></img> }
          </div>

          <div className="flex items-center justify-center mb-28 pt-6">
            <div className="post-content" dangerouslySetInnerHTML={postContent}></div>
          </div>

          <div className="flex flex-col items-center sm:flex-row sm:space-x-10">
            <textarea className="resize-none w-full h-44 sm:h-24 
                                 p-4 bg-white dark:bg-black-dark brd border" 
                      maxLength="200" 
                      onChange={e => setComment(e.target.value)}
                      placeholder="Your comment goes here ...">
            </textarea>

            <div className="w-full sm:w-auto sm:h-24 flex sm:flex-col 
                            justify-between brd border">
              <div className="h-full sm:w-full flex items-center justify-center space-x-2 py-1 px-4 brd border-b">
                <div className="flex items-center space-x-1 text-grey-dark">
                  <span>{ comments.length }</span>
                  <BiCommentDetail className="icon" />
                </div>
                <div className="flex items-center space-x-1 text-grey-dark">
                  <span>{ likes.length }</span>
                  <BiUpvote className="icon hover:text-blue" onClick={e => likePost(e)} />
                </div>
              </div>
              <button className="btn blue-btn w-40"
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
                      <span>{new Date(comment.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>}
        </div> 
        
        <div className="mt-20">
          { userPosts.length > 0 &&
          <div>
            <h3>{`More from ${post.username}`}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 my-5">
              { userPosts.map(post => <PostCard post={post} />)}
            </div>
          </div>}
          
          { topicPosts.length > 0 &&
          <div>
            <h3>{`More from ${post.topic}`}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 my-5">
              {  topicPosts.map(post => <PostCard post={post} />)}
            </div>
          </div>}
        </div>

      </div>
    </main>
    }
    </>
  )
}


export default Post