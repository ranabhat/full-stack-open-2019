import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { logOut } from '../reducers/userReducer'

let LogOutButton = (props) => {
  return (
    <Button onClick={() => {
      props.logOut()
      props.history.push('/login')
    }
    }>logout</Button>
  )
}

LogOutButton = withRouter(LogOutButton)

const mapDispatchToProps = {
  logOut,
}
export default connect(null, mapDispatchToProps)(LogOutButton)