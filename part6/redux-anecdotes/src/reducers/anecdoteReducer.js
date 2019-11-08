import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
 // console.log('state now: ', state)
 // console.log('action', action)
  switch(action.type) {
    case 'VOTE' :
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
   default: 
    return state
}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch( {
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
 
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
  })
  }
}

export const voteForAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(n => n.id === id)
    const newAnecdoteContent = {
      content: anecdoteToVote.content,
      id: anecdoteToVote.id,
      votes: anecdoteToVote.votes + 1
    }
    const updateAnecdote = await anecdoteService.updateVotes(id, newAnecdoteContent)
    console.log('update anecdote', updateAnecdote)
    dispatch({
      type: 'VOTE',
     data: { id }
    })
  }
}

export default anecdoteReducer