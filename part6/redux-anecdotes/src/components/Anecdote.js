import React from 'react'

const Anectdote = ({ anecdote, voteClick }) => {
    return (
        <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={voteClick}>vote</button>
        </div>
      </div>
    )
}

export default Anectdote