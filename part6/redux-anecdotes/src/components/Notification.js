import React from 'react'

const Notification = ({ store }) => {
  console.log('notification store get', store.getState().notify === null)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!store.getState().notify) {
  return (
    null
  )
  }
  else if (store.getState().notify){
    return(
    <div style={style}>
    {`you voted ${store.getState().notify} `}
  </div>
    )
  }
}

export default Notification