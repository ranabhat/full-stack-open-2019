import React from 'react'
import {
  //  BrowserRouter as Router,
  //  Route,  Redirect,
  Link,
  withRouter
} from 'react-router-dom'
//import BlogPostTogglable from './BlogPostTogglable'
import { deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

let Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //console.log('propsblog',[props.blog])

  // const handleDeleteBlogPost = id => async() => {
  //   const findBlogToDelete = [props.blog].find(blog => blog.id === id)
  //   if( window.confirm(`remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)) {

  //     props.deleteBlog(findBlogToDelete.id)
  //   }
  // }

  // const handleLikeClick = id => async() => {
  //   //console.log('handlelike id', id)
  //   console.log('props handle like', [props.blog])
  //   const findBlogToLike = [props.blog].find(blog => blog.id === id)
  //   console.log('findblogtolike', findBlogToLike)
  //   props.likeBlog(findBlogToLike.id)
  //   props.displayNotificationFor(`you voted ${findBlogToLike.title}` , 10)
  // }
  console.log('campare for delete', props.user.name === props.blog.user.name)
  return(
    <div style={blogStyle} >
      {/* <div onClick={() => console.log('clicked')}> */}
      {/* <BlogPostTogglable titleLabel={props.blog.title} authorLabel={props.blog.author}>
        <div className="allBlogContent">
          {props.blog.url} <br/>
          {props.blog.likes + ' likes'} <button onClick={handleLikeClick(props.blog.id)}>likes</button><br/>
          {`Added by ${props.blog.user.name===undefined ? props.user.name : props.blog.user.name}`} <br/>
          {props.user.name === props.blog.user.name ?
            <button onClick={handleDeleteBlogPost(props.blog.id)}>remove</button>
            : null
          }
        </div>
      </BlogPostTogglable> */}
      <p>
        <Link to={`/blogs/${props.blog.id}`}>{props.blog.title} {props.blog.author}</Link>
      </p>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
// const mapDispatchToProps = {
//   deleteBlog
// }
// console.log('nnnn',mapDispatchToProps)
//export default Blog
Blog = withRouter(Blog)
export default connect(mapStateToProps, { likeBlog, deleteBlog, displayNotificationFor })(Blog)


// import React from 'react'
// import BlogPostTogglable from './BlogPostTogglable'

// const Blog = ({ blog, likeClick, deleteClick, username }) => {
//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   return(
//     <div style={blogStyle} >
//       {/* <div onClick={() => console.log('clicked')}> */}
//       <BlogPostTogglable titleLabel={blog.title} authorLabel={blog.author}>
//         <div className="allBlogContent">
//           {blog.url} <br/>
//           {blog.likes + ' likes'} <button onClick={likeClick(blog.id)}>likes</button><br/>
//           {`Added by ${blog.user.name===undefined ? username : blog.user.name}`} <br/>
//           {username === blog.user.name ?
//             <button onClick={deleteClick(blog.id)}>remove</button>
//             : null
//           }
//         </div>
//       </BlogPostTogglable>

//     </div>
//   )
// }

// export default Blog