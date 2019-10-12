import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>  
    )
}

const Statistics = ({ calculatedValues }) => {
    const totalFeedback = calculatedValues.reduce((acc, curr) => acc + curr, 0)
    if (totalFeedback === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    const postiveFeedback = `${(calculatedValues[0]/totalFeedback)* 100} %`
    return (
         <table>
            <thead>
            </thead>
            <tbody>
                <Statistic text={'good'} value={calculatedValues[0]}/>
                <Statistic text={'neutral'} value={calculatedValues[1]}/>
                <Statistic text={'bad'} value={calculatedValues[2]}/>
                <Statistic text={'all'} value={totalFeedback}/>
                <Statistic text={'average'} value={totalFeedback/16}/>
                <Statistic text={'positive'} value={postiveFeedback}/>
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    const handleGoodClick = () => {
        setGood(good + 1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }
    const handleBadClick = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <Header title={'give feedback'} />
            <Button text={'good'} onClick={handleGoodClick}/>
            <Button text={'neutral'} onClick={handleNeutralClick} />
            <Button text={'bad'} onClick={handleBadClick} />
            <Header title={'statistics'} />
            <Statistics calculatedValues={[good, neutral, bad]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))


