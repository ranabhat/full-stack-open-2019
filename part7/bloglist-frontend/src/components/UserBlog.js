import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import FormBlogCreate from './FormBlogCreate'
import Blog from './Blog'
import { logOut } from '../reducers/userReducer'

const UserBlog = (props) => {
  if ( props.blogsToShow === undefined) { return null }
  return(
    <div>
      <h2>blog app</h2>
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


const mapStateToProps = (state) => {
  return {
    blogsToShow: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  logOut,
}


export default connect(mapStateToProps, mapDispatchToProps)(UserBlog)