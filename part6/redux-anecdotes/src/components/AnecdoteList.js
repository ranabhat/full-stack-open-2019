import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { removeNotificationFor } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
    //const { anecdotes, filter } = store.getState()
    //console.log('anecdotes', anecdotes)
    //console.log('filter', filter)
    const anecdotesToShow = () => {
        if ( props.filter === '' ) {
            return props.anecdotes
        }
  
    else if (props.filter !== '') {
        return  props.anecdotes.filter(r => r.content.toLowerCase().indexOf(props.filter) !== -1)

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
                    props.voteForAnecdote(anecdote.id)
                    props.displayNotificationFor({text:anecdote.content, votedOrCreated:'you Voted'})
                    setTimeout(()=> {
                    props.removeNotificationFor({text:anecdote.content, votedOrCreated:'you Voted'})
                    }, 5000)
               
                }
                }
            />
         )
         }
    </>
    )
}

// Component needs the list of anecdotes and the value of filter from the redux stores
// connect function accepts mapStateToProps as first parameter

const mapStateToProps = (state) => {
    //console.log('mapStateToProps state', state)
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    voteForAnecdote,
    displayNotificationFor,
    removeNotificationFor,
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes