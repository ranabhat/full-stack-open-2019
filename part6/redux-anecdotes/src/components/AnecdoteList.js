import React from 'react'
import Anecdote from './Anecdote'

import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    const sortAnecdoteByVotes = store.getState().sort((a, b) => {
        return b.votes - a.votes
    })
    return (
        <>
         {sortAnecdoteByVotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                voteClick={() => 
                    store.dispatch(voteForAnecdote(anecdote.id))
                }
            />
         )
         }
    </>
    )
}

export default AnecdoteList