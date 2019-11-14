import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
//import loginService from './services/login'
//import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import UserBlog from './components/UserBlog'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
//import { useField } from './hooks'
import { login } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
//import { setTokenForUser } from './reducers/blogReducer'
//import { getUser } from './reducers/userReducer'

const App = (props) => {

  /**************************************Fetching data from server *************************************************/
  useEffect(() => {
    // blogService
    //   .getAll()
    //   .then(initialBlogs => setBlogs(initialBlogs))
    props.initializeBlogs()

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log('loggedUserJSOnm', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      console.log('props user token', user)
      // props.setTokenForUser(user.token)
    }
  }, [props])


  /*************************************************************************************************************/
  console.log('app toimi', props)
  //console.log('user', user)
  return(
    <div>
      <Router>
        <div>
          {/* <h2>Log in to application</h2> */}
          {props.user === false
            ? <Route exact path="/" render={() =>
              <LoginForm
              />}
            />

            :<Route exact path="/" render={() =>
              // props.user ? <Users
              // /> : <Redirect to="/" />
              <UserBlog />
            }
            />
          }
          <Route exact path="/users/:id" render={({ match }) =>
            <User idUserArray={props.blogs.find(a => a[0] === match.params.id)}/> }
          />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <SingleBlog singleBlog={props.blogSingle.find(a => a.id === match.params.id)}/> }
          />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('app user state', Object.keys(state.user).length === 0)
  console.log(state.blogs)
  const mapToBlogUser =  state.blogs.map(blogs => blogs.user)
  const groupBy = (objectArray, property)  => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }
  const groupByUserId = groupBy(mapToBlogUser, 'id')
  console.log('group by user id',Object.entries(groupByUserId))

  const singleBlog=state.blogs.find(a => a.id === '5dbca389327808225f1667b5')
  console.log('single-blog', singleBlog)
  return {
    user: Object.keys(state.user).length !== 0,
    blogs: Object.entries(groupByUserId),
    blogSingle: state.blogs
  }
}

export default connect(mapStateToProps, { login, initializeBlogs })(App)
