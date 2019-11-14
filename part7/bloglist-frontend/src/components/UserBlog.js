import React from 'react'
import { connect } from 'react-redux'
import {
//  BrowserRouter as Router,
//  Route, Link, Redirect,
  withRouter
} from 'react-router-dom'
import Notification from './Notification'
import Togglable from './Togglable'
import FormBlogCreate from './FormBlogCreate'
import Blog from './Blog'
import { logOut } from '../reducers/userReducer'

let UserBlog = (props) => {
  // const handleLogOut = () => {
  //   props.logOut()
  // }
  return(
    <div>
      <h2>blogs</h2>
      <Notification  />
      <div> <p>{props.user.name} is logged in
        <button onClick={() => {
          props.logOut()
          props.history.push('/')
        }
        }>
          logout</button></p></div>
      <div>
        <Togglable buttonLabel="new blog">
          <FormBlogCreate
          />
        </Togglable>
        {props.blogsToShow.map(blog =>
          <Blog key={blog.id} blog={blog}  /> )}
      </div>
    </div>
  )
}

// const blogsToShow = ({ blogs }) => {
//   console.log(blogs)
//   return blogs.sort((a, b) => a.likes - b.likes)
// }


const mapStateToProps = (state) => {
  return {
    blogsToShow: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  logOut,
}
UserBlog = withRouter(UserBlog)

export default connect(mapStateToProps, mapDispatchToProps)(UserBlog)