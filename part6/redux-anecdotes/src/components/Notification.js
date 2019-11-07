import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
 // console.log('notification store get', store.getState().notify===null ? 'one null' : Object.values(store.getState().notify)[1])
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