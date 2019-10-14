import React from 'react'

const CountryLess = ({ country, handleShowClick }) => {
    return(
      <div key={country.name}>
      {country.name}
      <button onClick={handleShowClick}>show</button>
      </div>
    )
  }

export default CountryLess