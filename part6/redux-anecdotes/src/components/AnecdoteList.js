import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'
import { removeNotificationFor } from '../reducers/notificationReducer'

// props.anecdotesToShow coming from mapStateToProps
const AnecdoteList = (props) => {
    return (
        <>
         {props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
    if ( filter === '' ) {
        return anecdotes.sort((a,b) => b.votes - a.votes)
    }

    else if (filter !== '') {
    return  (anecdotes.filter(r => r.content.toLowerCase().indexOf(filter) !== -1)).sort((a,b) => b.votes - a.votes)

    }
}

// Component needs the list of anecdotes and the value of filter from the redux stores
// connect function accepts mapStateToProps as first parameter

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesToShow(state)
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