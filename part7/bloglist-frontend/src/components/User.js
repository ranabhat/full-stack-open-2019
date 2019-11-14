import React from 'react'
import { connect } from 'react-redux'
import {
  // BrowserRouter as Router,
  // Route, Link, Redirect,
  withRouter
} from 'react-router-dom'
//import Notification from './Notification'
// import Togglable from './Togglable'
// import FormBlogCreate from './FormBlogCreate'
//import Blog from './Blog'
import { logOut } from '../reducers/userReducer'

let User = (props) => {
  // const handleLogOut = () => {
  //   props.logOut()
  // }
  console.log('user props', props.idUserArray)
  if ( props.idUserArray === undefined) { return null }
  return(
    <div>
      <h2>blogs</h2>
      <div> <p>{props.idUserArray[1][0].name} is logged in
        <button onClick={() => {
          props.logOut()
          props.history.push('/')
        }
        }>
          logout</button></p></div>
      <h2>{props.idUserArray[1][0].name}</h2>
      <h3>Added Blogs</h3>
      {props.blogs.filter(blogs => blogs.user.name === props.idUserArray[1][0].name).map(blog =>
        <li key={blog.id}>{blog.title}</li>

      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('from single User state prop blogs', state.blogs)
  const blogsOfUser = state.blogs.filter(blogs => blogs.user.name === 'Bikesh Maharjan')
  console.log('user bikesh blogs', blogsOfUser.map(blog => blog.title))
  return {
    blogs: state.blogs,
    user: state.user,
  }
}
const mapDispatchToProps = {
  logOut,
}
User = withRouter(User)

export default connect(mapStateToProps, mapDispatchToProps)(User)