import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
    return(
        <h1>{title}</h1>
    )
}

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const TotalVote = ({ vote }) => {
    return(
       <p>has {vote} votes</p>  
    )
}

const Result = ({ result, allAnecdoteCountState, voteIndex, value }) => {
    //console.log('result',result)
    //console.log('vote', voteIndex)
    console.log('anecdote state', allAnecdoteCountState)
    const totalVoteCount = allAnecdoteCountState.reduce((acc, curr) => acc + curr, 0)
    console.log('totalVoteCount', totalVoteCount)
    if (totalVoteCount === 0) {
        return(
            <p>Vote Count Not Started. Please press Vote to find out the anecdotes with most votes</p>
        )
    }
    return(
        <>
        <p>{result[voteIndex]}</p>
        <p>has {value} votes</p>
        </>
    )
}

const App = (props) => {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
  const [selected, setSelected] = useState(getRandomInt(6))
  const [vote, setVote] = useState(0)
  const [anecdoteCount, setAnecdoteCount] = useState([...anecdotes].fill(0))
  const [mostVoteIndex, setMostVoteIndex] = useState(0)
  const [valueOfMostVoteIndex, setValueOfMostVoteIndex] = useState(0)

  const handleAnecdoteClick = () => {
      anecdoteCount[selected] += vote //[...anecdotesCount][selected] + 1
      console.log('anecdotesCountNow', anecdoteCount)
      const mostVotesIndex = anecdoteCount.indexOf(Math.max.apply(Math, anecdoteCount))
      console.log('index of most votes', mostVotesIndex)
      console.log('Value of most votes index', anecdoteCount[mostVotesIndex])
      setSelected(getRandomInt(6))
      setVote(0)
      setMostVoteIndex(mostVotesIndex)
      setValueOfMostVoteIndex(anecdoteCount[mostVotesIndex])

  }

  const handleVoteClick = () => {
      setVote(vote + 1)
  }

  return (
    <div>
      <Header title={'Anecdote of the day'} />
      {props.anecdotes[selected]}
      <TotalVote vote={vote} />
      <Button text={'vote'} onClick={handleVoteClick} /> 
      <Button text={'next anecdote'} onClick={handleAnecdoteClick}/>
      <Header title={'Anecdote with most votes'} />
      <Result result={anecdotes} allAnecdoteCountState={anecdoteCount} voteIndex={mostVoteIndex} value={valueOfMostVoteIndex} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


