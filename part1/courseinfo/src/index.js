import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
    return (
        <>
            <h1>{course}</h1>
        </>
    )
}

const Content = ({ content }) => {
    return (
        <>
            <Part content={content[0]} />
            <Part content={content[1]} />
            <Part content={content[2]} />
        </>
    )

}

const Part = ({ content }) => {
    return (
        <p>{content.name} {content.exercises}</p>
    )
}

const Total = ({ content }) => {
    return (
        <p>Number of exercise {content.reduce((acc, curr) => acc +curr.exercises, 0)}</p>
    )
}
const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
    return (
        <div>
            <Header course={course.name} />
            <Content content={course.parts} />
            <Total content={course.parts} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))


