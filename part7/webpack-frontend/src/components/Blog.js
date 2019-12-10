import React from 'react'
import {
  //  BrowserRouter as Router,
  //  Route,  Redirect,
  Link,
  withRouter
} from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
//import BlogPostTogglable from './BlogPostTogglable'
import { deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

let Blog = (props) => {

  if ( props.blog === undefined) { return null }
  return(
    <Segment color='red'>
      <Link to={`/blogs/${props.blog.id}`}>{props.blog.title} {props.blog.author}</Link>
    </Segment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

Blog = withRouter(Blog)
export default connect(mapStateToProps, { likeBlog, deleteBlog, displayNotificationFor })(Blog)
