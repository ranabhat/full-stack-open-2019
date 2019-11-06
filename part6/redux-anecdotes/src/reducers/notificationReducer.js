  const initialState = Object.assign({},{text:null, votedOrCreated: ''})
  //console.log('vvvv',initialState.text)
  const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
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
                return Object.assign({}, action).notify
                
        case 'REMOVE_NOTIFICATION':
            return initialState
        default:
            return initialState
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