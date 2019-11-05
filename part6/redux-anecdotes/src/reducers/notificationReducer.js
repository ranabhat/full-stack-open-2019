  
  const notificationReducer = (state = null , action) => {
    //console.log('state now: ', state)
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
                return action.notify
                
        case 'REMOVE_NOTIFICATION':
            return Object.assign({}, action, {
                notify: null}).notify
        default:
            return state
    }
}
export const displayNotificationFor = (notify) => {
    return {
      type: 'SET_NOTIFICATION',
      notify
    }
  
  }

export const removeNotificationFor = (notify) => {
    return {
        type: 'REMOVE_NOTIFICATION',
        notify
    }
}
  

export default notificationReducer