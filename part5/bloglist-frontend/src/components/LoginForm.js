import React from 'react'
import Notification from './Notification'

const LoginForm = ({  message, colorErrorMessage, handleLogin, username, password }) => {
  //console.log(username)
  return(
      <>
      <h2>login to the application</h2>
      <Notification message={message} colorErrorMessage={colorErrorMessage} />
      <form onSubmit= {handleLogin} className='form'>
        <div>
                username
          <input {...username}
            name="Username"
            className='username'
          />
        </div>
        <div>
              password
          <input {...password}
            name="Password"
            className='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
  )

}

export default LoginForm