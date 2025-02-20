import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  //console.log('notification props', Object.values(props.notify)[1])
  //console.log('test object notification', Object.values(props.notify)[0]=== null)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!Object.values(props.notify)[0]) {
  return (
    null
  )
  }
  else if (Object.values(props.notify)[0]){
    return(
    <div style={style}>
    {`${Object.values(props.notify)[1]} '${Object.values(props.notify)[0]}' `}
  </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notify: state.notify
  }
}

export default connect(mapStateToProps)(Notification)