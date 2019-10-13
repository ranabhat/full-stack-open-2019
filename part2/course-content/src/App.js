import React from 'react'
import Course from './components/Course'

const App = ({ course }) => {
  const mainTitle = 'Web development curriculum'
  return (
    <div>
      <h1>{mainTitle}</h1>
      <Course course={course} />
    </div>
  )
}

export default App
