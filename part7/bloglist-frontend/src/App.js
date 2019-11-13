import React, { useEffect } from 'react'
import { connect } from 'react-redux'
//import loginService from './services/login'
//import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import UserBlog from './components/UserBlog'
//import { useField } from './hooks'
import { login } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setTokenForUser } from './reducers/blogReducer'
//import { getUser } from './reducers/userReducer'

const App = (props) => {

  /**************************************Fetching data from server *************************************************/
  useEffect(() => {
    // blogService
    //   .getAll()
    //   .then(initialBlogs => setBlogs(initialBlogs))
    props.initializeBlogs()

  }, [props])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log('loggedUserJSOnm', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      console.log('props user token', user)
      props.setTokenForUser(user.token)
    }
  }, [props])


  /*************************************************************************************************************/
  console.log('app toimi', props.user.hasOwnProperty('token') )
  //console.log('user', user)
  return(
    <div>
      {/* <h2>Log in to application</h2> */}
      {props.user.hasOwnProperty('token') === false
        ? <LoginForm
        />

        : <UserBlog
        />
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { login, initializeBlogs, setTokenForUser })(App)
