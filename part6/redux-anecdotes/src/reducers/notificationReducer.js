  const initialState = Object.assign({},{text:null, votedOrCreated: ''})
  //console.log('vvvv',initialState.text)
  const notificationReducer = (state = initialState, action) => {
   // console.log('state now: ', state)
    console.log('action notification', action)
    // const bemove = Object.assign({}, action, {
    //     notify: null
    // })
    // console.log('bemove',bemove)
    switch(action.type) {
        case 'SET_NOTIFICATION':
                // const id = action.data.id
                // const anecdoteToVote = state.find(n => n.id === id)
                // return (anecdoteToVote !== false ? anecdoteToVote.content : null)
               // console.log('set noti', Object.assign({}, action).notify)
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
    
 }, time)
  }}


// export const removeNotificationFor = (notify) => {
//   return dispatch => {
//   setTimeout(() => {
//     dispatch(
//       {
//       type: 'REMOVE_NOTIFICATION',
//       notify,
//       }
//     )
    
//  }, 5000)
// }
// }
  

export default notificationReducer