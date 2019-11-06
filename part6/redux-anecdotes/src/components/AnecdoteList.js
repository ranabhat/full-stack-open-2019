import React from 'react'
import Anecdote from './Anecdote'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { removeNotificationFor } from '../reducers/notificationReducer'


const AnecdoteList = ({ store }) => {
    const { anecdotes, filter } = store.getState()
    //console.log('anecdotes', anecdotes)
    //console.log('filter', filter)
    const anecdotesToShow = () => {
        if ( filter === '' ) {
            return anecdotes
        }
  
    else if (filter !== '') {
        return  anecdotes.filter(r => r.content.toLowerCase().indexOf(filter) !== -1)

    }
}
   // console.log('anecdotesToShow', anecdotesToShow())
    const sortAnecdoteByVotes = anecdotesToShow().sort((a, b) => {
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
                    store.dispatch(displayNotificationFor({text:anecdote.content, votedOrCreated:'you Voted'}))
                    setTimeout(()=> {
                    store.dispatch(removeNotificationFor({text:anecdote.content, votedOrCreated:'you Voted'}))
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