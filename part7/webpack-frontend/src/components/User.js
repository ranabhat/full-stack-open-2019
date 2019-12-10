import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import { List, Segment } from 'semantic-ui-react'

let User = (props) => {
  console.log('user props', props.idUserArray)
  if ( props.idUserArray === undefined) { return null }
  return(
    <div>
      <h2>{props.idUserArray[1][0].name}</h2>
      <h3>Added Blogs</h3>
      <Segment inverted>
        <List divided inverted relaxed>
          {props.blogs.filter(blogs => blogs.user.name === props.idUserArray[1][0].name).map(blog =>
            <List.Item key={blog.id}>
              <List.Content>
                <List.Header>{blog.title}</List.Header>
              </List.Content>
            </List.Item>
          )}
        </List>
      </Segment>
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log('from single User state prop blogs', state.blogs)
  //const blogsOfUser = state.blogs.filter(blogs => blogs.user.name === 'Bikesh Maharjan')
  // console.log('user bikesh blogs', blogsOfUser.map(blog => blog.title))
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

User = withRouter(User)

export default connect(mapStateToProps, null)(User)