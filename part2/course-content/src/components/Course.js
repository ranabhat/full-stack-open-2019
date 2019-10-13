import React from 'react'

const Header = ({ course }) => {
    return (
        <h3>{course}</h3>
    )
}

const Part = ({ partName, partExercises }) => {
    return (
        <p>{partName} {partExercises}</p>
    )
}

const Content = ({ content }) => {

    const rows = () => content.map(part => 
        <Part
           key={part.id} partName={part.name} partExercises={part.exercises}
        />
        )
    
    return ( 
       <>
        {rows()}
       </>
    )
}

const Total = ({ content }) => {
    return (
        <p><b>total of {content.reduce((acc, curr) => acc +curr.exercises, 0)} exercises</b></p>
    )
}


const Course = ({ course }) => {
    const rows = () => course.map(course => 
        <div key={course.id}>
        <Header course={course.name} />
        <Content content={course.parts} />
        <Total content={course.parts} />
        </div>
    )
    return (
        // <div key>
        //     <Header course={course}  />
        //     <Content content={course.parts} />
        //     <Total content={course.parts} />
        // </div>
       <> {rows()}</>
    )
}

export default Course