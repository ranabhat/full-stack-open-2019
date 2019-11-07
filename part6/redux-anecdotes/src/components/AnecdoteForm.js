import React from 'react'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { removeNotificationFor } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.displayNotificationFor({text:content, votedOrCreated:'you created'})
        setTimeout(()=> {
          props.removeNotificationFor({text:content, votedOrCreated:'you created'})
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

export default connect(null, { createAnecdote, displayNotificationFor, removeNotificationFor })(AnecdoteForm)