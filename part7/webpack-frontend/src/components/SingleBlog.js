import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Form, Button } from 'semantic-ui-react'
import { deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { logOut } from '../reducers/userReducer'
import { commentBlog } from '../reducers/blogReducer'

let SingleBlog = (props) => {
//  console.log('user props', props.singleBlog)
  if ( props.singleBlog === undefined) { return null }

  const handleDeleteBlogPost = id => async() => {
    const findBlogToDelete = props.blogs.find(blog => blog.id === id)
    if( window.confirm(`remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)) {

      props.deleteBlog(findBlogToDelete.id)
      props.history.push('/')
    }
  }

  const handleLikeClick = id => async() => {
    // console.log('handlelike id', id)
  //  console.log('props handle like', props.blogs)
    const findBlogToLike = props.blogs.find(blog => blog.id === id)
    //  console.log('findblogtolike', findBlogToLike)
    props.likeBlog(findBlogToLike.id)
    props.displayNotificationFor(`you voted ${findBlogToLike.title}` , 10)
  }

  const addComment =  async (event) => {
    event.preventDefault()
    //  console.log('button clicked', event.target)
    const comment = event.target.comment.value
    //  console.log('typed', comment)
    event.target.comment.value = ''
    const commentObject = {
      text : comment
    }
    //  console.log('comment to be posted', commentObject)
    //   console.log('chosen blog id in add comment', Object.values(props.chosenBlog)[0].id)
    props.commentBlog(Object.values(props.chosenBlog)[0].id, commentObject)

  }
  return(
    <Container>
      <h2>blog app</h2>
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
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Field>
          {/* <label>username</label> */}
          <input name='comment' />
        </Form.Field>
        <Button type='submit'>add comment</Button>
      </Form>
      {!props.singleBlog.comments

        ? ''

        : props.singleBlog.comments.map(obje => <li key={obje._id}>{obje.text}</li>)

      }

    </Container>
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.log('from single Blog state prop user', state.user)
  // console.log('own props in Single blog map state', ownProps)
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
  commentBlog
}
SingleBlog = withRouter(SingleBlog)

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog)