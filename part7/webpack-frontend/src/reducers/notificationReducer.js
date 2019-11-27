const notificationReducer = (state = '', action) => {
  // console.log('state notification now: ', state)
  // console.log('action notification', action)
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.notify
  case 'REMOVE_NOTIFICATION':
    return ''
  default:
    return ''
  }
}

export const displayNotificationFor = (notify, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notify
      })
    }, 500)
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, time*1000)
  }
}

export const clearNotification = () => (
  {
    type: 'REMOVE_NOTIFICATION'
  }
)

export default notificationReducer

