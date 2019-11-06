import React from 'react'

const Notification = ({ store }) => {
  console.log('notification store get', store.getState().notify===null ? 'one null' : Object.values(store.getState().notify)[1])
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!Object.values(store.getState().notify)[0]) {
  return (
    null
  )
  }
  else if (Object.values(store.getState().notify)[0]){
    return(
    <div style={style}>
    {`${Object.values(store.getState().notify)[1]} '${Object.values(store.getState().notify)[0]}' `}
  </div>
    )
  }
}

export default Notification