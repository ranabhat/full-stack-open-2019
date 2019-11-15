import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
//import loginService from './services/login'
//import blogService from './services/blogs'
import { Container } from 'semantic-ui-react'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import UserBlog from './components/UserBlog'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
//import { useField } from './hooks'
import { login } from './reducers/userReducer'
import { keepTheUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut } from './reducers/userReducer'
import LogOutButton from './components/LogOutButton'
//import { setTokenForUser } from './reducers/blogReducer'
//import { getUser } from './reducers/userReducer'
import Notification from './components/Notification'


const App = (props) => {
  const padding = { padding: 5 }
  /**************************************Fetching data from server *************************************************/
  useEffect(() => {
    // blogService
    //   .getAll()
    //   .then(initialBlogs => setBlogs(initialBlogs))


  }, [])

  // useEffect(() => {
  //   const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
  //   console.log('loggedUserJSOnm', loggedUserJSON)
  //   if (loggedUserJSON === undefined) {
  //     const user = JSON.parse(loggedUserJSON)
  //     //setUser(user)
  //     console.log('props user token', user)
  //     // props.setTokenForUser(user.token)
  //   }
  // }, [props])

  useEffect(() => {
    // const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    // console.log('in effect initial local storqage', loggedUserJSON)
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   // setUser(user)
    //   // blogService.setToken(user.token)
    //   props.login({ username: user.username , password: 'sweetlife' })
    //console.log('json parse logged user user' , user)
    console.log('first rendeer')
    props.keepTheUser()
    props.initializeBlogs()

  }, [])

  /*************************************************************************************************************/
  console.log('app toimi', props)
  //console.log('user', user)
  return(
    <Container>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {/* <Link style={padding} to="/users">users</Link> */}
            {props.user === false
              ? <Link to="/login">login</Link>
              : <><em>{props.loggedInUser.name} logged in</em>
                {/* <button onClick={() => {
                  props.logOut()
                  props.history.push('/login')
                }
                }>logout</button> */}
                <LogOutButton />
              </>
            }
          </div>
          <Notification />
          {/* <h2>Log in to application</h2> */}
          {/* {props.user === false */}
          <Route exact path="/login" render={() =>
            !props.user ? <LoginForm /> : <Redirect to="/"
            />}
          />

          <Route exact path="/" render={() =>
            props.user ? <UserBlog
            /> : <Redirect to="/login" />

          }
          />
          {/* } */}
          <Route exact path="/users" render={() =>
            props.user ? <Users /> : <Redirect to="/login" />
          } />
          <Route exact path="/users/:id" render={({ match }) =>
            <User idUserArray={props.blogs.find(a => a[0] === match.params.id)}/> }
          />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <SingleBlog singleBlog={props.blogSingle.find(a => a.id === match.params.id)}/> }
          />
        </div>
      </Router>
    </Container>
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
  console.log('logged in user',state.user)
  console.log(' is prop user length not equal to zero', Object.keys(state.user).length !== 0)
  console.log('notification in app', state.notify === '')
  return {
    user: Object.keys(state.user).length !== 0,
    blogs: Object.entries(groupByUserId),
    blogSingle: state.blogs,
    loggedInUser: state.user,
    notification: state.notify,
  }
}


export default connect(mapStateToProps, { login, keepTheUser, logOut, initializeBlogs })(App)
