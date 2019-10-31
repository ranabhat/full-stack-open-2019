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
          <input
            type={username.type}
            value={username.value}
            name="Username"
            onChange={username.onChange}
            className='username'
          />
        </div>
        <div>
              password
          <input
            type={password.type}
            value={password.value}
            name="Password"
            onChange={password.onChange}
            className='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
  )

}

export default LoginForm