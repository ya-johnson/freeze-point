import { Link } from 'wouter'
import { BiUpvote, BiCommentDetail } from 'react-icons/bi'


const PostCard = ({ post }) => {


  return (

    <div className="post-card">\

      <Link href={`/posts/${post._id}`}>
        <a>
          <img src="#" alt="img" className="post-card-img" />
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
          <div className="post-card-about">
            <Link href={`/users/${post.userId}`}>
              <a className="text-pink">username{post.username}</a>
            </Link>
            <span>{post.createAt}</span>
          </div>

          <div className="post-notes">
            <div className="post-comments">
              <span>{ post.comments.length }</span>
              <BiCommentDetail className="post-card-icon"/>
            </div>
            <div className="post-likes">
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