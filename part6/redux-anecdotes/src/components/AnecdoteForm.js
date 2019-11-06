import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { removeNotificationFor } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.store.dispatch(
            createAnecdote(content))
        props.store.dispatch(displayNotificationFor({text:content, votedOrCreated:'you created'}))
        setTimeout(()=> {
          props.store.dispatch(removeNotificationFor({text:content, votedOrCreated:'you created'}))
          }, 5000)
    
    
  }

  return (
    <form onSubmit={addAnecdote}>
        <div>
            <input name="anecdote" />
        </div>
        <button>create</button>
  </form>
  )
}

export default AnecdoteForm