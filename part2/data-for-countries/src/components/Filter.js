import React from 'react'

const Filter = ({ filterLabel, handleSearchChange }) => {
    return(
      <div>
      <p>{filterLabel} <input onChange={handleSearchChange} /></p>
      </div>
    )
  }

export default Filter