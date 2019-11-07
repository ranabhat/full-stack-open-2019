// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)
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
    // data: {
    //   content,
    //   id: getId(),
    //   votes: 0
   // }
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
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }
}

export default anecdoteReducer