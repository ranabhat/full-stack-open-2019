import React from 'react'

const Countries = ({ countries }) => {
    const values = (countries.length > 10) 
      ? 'Too many matches, specify another filter'
      : countries
    return(
      <div>
      {values}
      </div>
    )
  }

export default Countries