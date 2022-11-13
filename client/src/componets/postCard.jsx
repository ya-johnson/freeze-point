import { Link, useRoute, useLocation } from 'wouter'
import { useUserStore } from '../store'
import { postService } from '../services'
import { useDelete } from '../hooks'
import { draft } from '../utils'
import { BiUpvote, BiCommentDetail, BiEdit, BiTrash } from 'react-icons/bi'


const PostCard = ({ post, updateList }) => {

  const [match, params] = useRoute('/users/:user')
  const [location, setLocation] = useLocation()
  const user = useUserStore(state => state.user)
  const isUser = match && user !== null && user?.id === post.userId
  const content = draft.createMarkdown(post.content)

  const deletePost = () => {
    postService.deletePost(user.token, post._id)
    updateList(post._id)
  }

  const displayDelete = useDelete(post.title, deletePost)

  return (

    <div className="relative w-full bg-white dark:bg-black-dark">
      { isUser && 
      <div className="absolute top-0 right-0 flex space-x-2 p-2 bg-white dark:bg-black-dark">
        <BiEdit className="cursor-pointer h-5 w-5 text-grey-dark hover:text-black dark:hover:text-white"
                onClick={() => setLocation(`posts/edit-post/${post._id}`)} />
        <BiTrash className="cursor-pointer h-5 w-5 text-grey-dark hover:text-red" 
                 onClick={displayDelete} />
      </div> }

      <Link href={`/posts/${post._id}`}>
        <a>{ post.image && <img className="w-full min-h-[250px]" src={post.image.url} /> }</a>
      </Link>

      <div className="p-4 w-full">
        <span className="text-blue text-sm">{post.topic}</span>
        <Link href={`/posts/${post._id}`}>
          <a><h4>{post.title}</h4></a>
        </Link>

        <textarea className="w-full h-[100px] my-2 
                            bg-white dark:bg-black-dark text-grey-dark 
                             resize-none overflow-hidden" 
                  disabled value={content} />

        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <Link href={`/users/${post.userId}`}>
              <a className="hover:text-pink capitalize">{post.username}</a>
            </Link>
            <span className="text-sm text-grey-dark">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-grey-dark">
              <span>{post.comments.length}</span>
              <BiCommentDetail className="post-card-icon"/>
            </div>
            <div className="flex items-center space-x-1 text-grey-dark">
              <span>{post.likes.length}</span>
              <BiUpvote className="post-card-icon"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}


export default PostCard