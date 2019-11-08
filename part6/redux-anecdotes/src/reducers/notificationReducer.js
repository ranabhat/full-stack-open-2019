  const initialState = Object.assign({},{text:null, votedOrCreated: ''})

  const notificationReducer = (state = initialState, action) => {
   // console.log('state now: ', state)
   // console.log('action notification', action)
    switch(action.type) {
        case 'SET_NOTIFICATION':
                return Object.assign({}, action).notify        
        case 'REMOVE_NOTIFICATION':
            return initialState
        default:
            return initialState
    }
}
export const displayNotificationFor = (notify, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        {
          type: 'SET_NOTIFICATION',
          notify,
      })
  }, 50)
  setTimeout(() => {
    dispatch(
      {
      type: 'REMOVE_NOTIFICATION',
      notify,
      }
    )
    
 }, time*1000)
  }}


export default notificationReducer