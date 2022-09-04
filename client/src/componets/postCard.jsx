import { Link } from 'wouter'
import { postService } from '../services'
import { BiUpvote, BiCommentDetail, BiTrash } from 'react-icons/bi'


const PostCard = ({ post, token, update }) => {

  const deletePost = () => {
    postService.deletePost(token, post._id)
    update(post._id)
  }


  return (

    <div className="post-card">

      { token && <BiTrash className="post-card-delete" 
                         onClick={deletePost}/>
      }

      <Link href={`/posts/${post._id}`}>
        <a>
        { post.image && <img className="post-card-img" src={post.image.url}></img> }
        </a>
      </Link>

      <div className="post-card-content">
        <span className="text-blue text-sm">{post.topic}</span>
        <Link href={`/posts/${post._id}`}>
          <a>
            <h4>{post.title}</h4>
          </a>
        </Link>

        <div className="post-card-info">
          <div className="post-card-about space-x-2">
            <Link href={`/users/${post.userId}`}>
              <a className="hover:text-pink capitalize">{post.username}</a>
            </Link>
            <span className="text-sm text-grey-dark">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="post-notes">
            <div className="post-card-comments">
              <span>{ post.comments.length }</span>
              <BiCommentDetail className="post-card-icon"/>
            </div>
            <div className="post-card-likes">
              <span>{ post.likes.length }</span>
              <BiUpvote className="post-card-icon"/>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}


export default PostCard