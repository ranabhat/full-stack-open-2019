import React from 'react'
import Notification from './Notification'

const LoginForm = ({ message, colorErrorMessage, handleLogin, username, password, onUsernameChange, onPasswordChange }) => {

  return(
      <>
      <h2>login to the application</h2>
      <Notification message={message} colorErrorMessage={colorErrorMessage} />
      <form onSubmit= {handleLogin} className='form'>
        <div>
                username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={onUsernameChange}
            className='username'
          />
        </div>
        <div>
              password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={onPasswordChange}
            className='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
  )

}

export default LoginForm