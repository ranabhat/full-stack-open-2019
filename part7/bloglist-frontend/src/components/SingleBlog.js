import React from 'react'
import { connect } from 'react-redux'
import {
  // BrowserRouter as Router,
//  Route, Link, Redirect,
  withRouter
} from 'react-router-dom'
// import Notification from './Notification'
// import Togglable from './Togglable'
// import FormBlogCreate from './FormBlogCreate'
//import Blog from './Blog'
import { deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { logOut } from '../reducers/userReducer'

let SingleBlog = (props) => {
  // const handleLogOut = () => {
  //   props.logOut()
  // }
  console.log('user props', props.singleBlog)
  if ( props.singleBlog === undefined) { return null }

  const handleDeleteBlogPost = id => async() => {
    const findBlogToDelete = props.blogs.find(blog => blog.id === id)
    if( window.confirm(`remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)) {

      props.deleteBlog(findBlogToDelete.id)
      props.history.push('/')
    }
  }

  const handleLikeClick = id => async() => {
    console.log('handlelike id', id)
    console.log('props handle like', props.blogs)
    const findBlogToLike = props.blogs.find(blog => blog.id === id)
    console.log('findblogtolike', findBlogToLike)
    props.likeBlog(findBlogToLike.id)
    props.displayNotificationFor(`you voted ${findBlogToLike.title}` , 10)
  }
  return(
    <div>
      <h2>blog app</h2>
      {/* <Notification /> */}
      {/* <div> <p>{props.user.name}is logged in
        <button onClick={() => {
          props.logOut()
          props.history.push('/')
        }
        }>
          logout</button></p></div> */}
      <h2>{props.singleBlog.title}</h2>
      <div className="allBlogContent">
        <a href={props.singleBlog.url}> {props.singleBlog.url}</a> <br/>
        {props.singleBlog.likes + ' likes'} <button onClick={handleLikeClick(props.singleBlog.id)}>likes</button><br/>
        {`Added by ${props.singleBlog.user.name===undefined ? props.user.name : props.singleBlog.user.name}`} <br/>
        {props.user.name === props.singleBlog.user.name ?
          <button onClick={handleDeleteBlogPost(props.singleBlog.id)}>remove</button>
          : null
        }
      </div>
      {/* {props.blogs.filter(blogs => blogs.user.name === props.idUserArray[1][0].name).map(blog =>
        <li key={blog.id}>{blog.title}</li>

      )} */}
      <h3>comments</h3>
      {!props.singleBlog.comments

        ? ''

        : props.singleBlog.comments.map(obje => <li key={obje._id}>{obje.text}</li>)

      }

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('from single Blog state prop user', state.user)
  console.log('own props in Single blog map state', ownProps)
  //   const blogsOfUser = state.blogs.filter(blogs => blogs.user.name === 'Bikesh Maharjan')
  //   console.log('user bikesh blogs', blogsOfUser.map(blog => blog.title))
  return {
    blogs: state.blogs,
    user: state.user,
    chosenBlog: ownProps,
  }
}
const mapDispatchToProps = {
  deleteBlog,
  displayNotificationFor,
  likeBlog,
  logOut,
}
SingleBlog = withRouter(SingleBlog)

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog)