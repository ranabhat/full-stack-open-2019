import React from 'react'
import Anecdote from './Anecdote'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { removeNotificationFor } from '../reducers/notificationReducer'


const AnecdoteList = ({ store }) => {
    const sortAnecdoteByVotes = store.getState().anecdotes.sort((a, b) => {
        return b.votes - a.votes
    })
    return (
        <>
         {sortAnecdoteByVotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                voteClick={() => {
                    store.dispatch(voteForAnecdote(anecdote.id))
                    store.dispatch(displayNotificationFor(anecdote.content))
                    setTimeout(()=> {
                    store.dispatch(removeNotificationFor(anecdote.content))
                    }, 5000)
               
                }
                }
            />
         )
         }
    </>
    )
}

export default AnecdoteList