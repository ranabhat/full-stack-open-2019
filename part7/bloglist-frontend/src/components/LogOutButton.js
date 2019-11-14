import React from 'react'
import { connect } from 'react-redux'
import {
//  BrowserRouter as Router,
//  Route, Link, Redirect,
  withRouter
} from 'react-router-dom'

import { logOut } from '../reducers/userReducer'

let LogOutButton = (props) => {
  return (
    <button onClick={() => {
      props.logOut()
      props.history.push('/login')
    }
    }>logout</button>
  )
}

LogOutButton = withRouter(LogOutButton)

// const mapStateToProps = (state) => {
//     return {
//       user: state.user
//     }
//   }

const mapDispatchToProps = {
  logOut,
}
export default connect(null, mapDispatchToProps)(LogOutButton)