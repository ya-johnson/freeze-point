import { useState, useEffect } from 'react'
import { Link } from 'wouter'
import { toast } from 'react-toastify'
import { draft, toastify } from '../utils'
import { useUserStore } from '../store'
import { authService ,postService } from '../services'
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
    setPostContent(draft.createHtml(post.content))
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
      toast.error('Comment must be at least 5 chracters', toastify.autoClose)
      return
    }

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
    <main>
      <div className="container my-20 max-w-[1000px]">
        <div className="mx-auto">

          <div className="space-y-2">
            <div className="space-y-2 pb-1">
              <Link href={`/topics/${post.topic}`}>
                <a className="text-blue">{post.topic}</a>
              </Link>
              <h1>{post.title}</h1>
            </div>
            <div className="flex items-end justify-between pb-4">
              <Link href={`/users/${post.userId}`}>
                  <a className="capitalize text-lg">{post.username}</a>
              </Link>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

          { post.image && <img className="w-full rounded-xl" src={post.image.url}></img> }
          </div>

          <div className="flex items-center justify-center mb-20 pt-6 pb-14 brd border-b">
            <div className="post-content" dangerouslySetInnerHTML={postContent}></div>
          </div>

          <div className="flex items-center">
            <textarea className="post-comment" 
                      maxLength="200" 
                      onChange={(e => setComment(e.target.value))}
                      placeholder="Your comment goes here ...">
            </textarea>

            <div className="h-24 flex flex-col justify-between">
              <div className="h-full w-full flex items-center justify-center 
                              space-x-2 brd border-t border-r border-l">
                <div className="flex items-center space-x-1 text-grey-dark">
                  <span>{ comments.length }</span>
                  <BiCommentDetail className="icon" />
                </div>
                <div className="flex items-center space-x-1 text-grey-dark">
                  <span>{ likes.length }</span>
                  <BiUpvote className="icon" onClick={e => likePost(e)} />
                </div>
              </div>
              <button className="btn pink-btn w-40"
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
            <h3>{`More posts from ${post.username}`}</h3>
            <div className="grid grid-cols-3 gap-10 my-10">
              { userPosts.map(post => <PostCard post={post} />)}
            </div>
          </div>}
          
          { topicPosts.length > 0 &&
          <div>
            <h3>{`More posts from ${post.topic}`}</h3>
            <div className="grid grid-cols-3 gap-10 my-10">
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