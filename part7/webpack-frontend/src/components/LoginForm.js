import React from 'react'
import { connect } from 'react-redux'
import {
//  BrowserRouter as Router,
//  Route, Link, Redirect,
  withRouter
} from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
//import blogService from '../services/blogs'
// import Notification from './Notification'
import { login } from '../reducers/userReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
//import { setTokenForUser } from '../reducers/blogReducer'

let LoginForm = (props) => {
  console.log(props)
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login({ username: event.target.username.value , password: event.target.password.value })
      // console.log('log in to ', logInTo)
      // !logInTo
      //   ?  props.displayNotificationFor('wrong username or password', 10)

      //   : props.displayNotificationFor('welcome', 10)
      props.history.push('/')
    } catch (error) {
      props.displayNotificationFor('wrong username or password', 10)
    }

  }
  return(
      <>
      <h2>login to the application</h2>
      {/* <Notification  /> */}
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input 
          name='username' />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input 
          name='password' type='password' />
        </Form.Field>
        <Button 
        type='submit'>login</Button>
      </Form>
      </>
  )

}
LoginForm = withRouter(LoginForm)

const mapStateToProps = (state) => {
  console.log('state prop in login form', state.user)
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, { login, displayNotificationFor })(LoginForm)