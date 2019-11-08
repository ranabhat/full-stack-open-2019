import React from 'react'
import { connect } from 'react-redux'
//import anecdoteService from '../services/anecdotes'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
//import { removeNotificationFor } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  console.log(props)
    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log('content', content)
        event.target.anecdote.value = ''
       // const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(content)
        props.displayNotificationFor({text:content, votedOrCreated:'you created'}, 5000)
       // console.log('ssssss', props.displayNotificationFor({text:content, votedOrCreated:'you created'}))
        // setTimeout(()=> {
        //   props.removeNotificationFor({text:content, votedOrCreated:'you created'})
        //   }, 5000)
    
    
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
export default connect(null, { createAnecdote, displayNotificationFor })(AnecdoteForm)
//export default connect(null, { createAnecdote, displayNotificationFor, removeNotificationFor })(AnecdoteForm)