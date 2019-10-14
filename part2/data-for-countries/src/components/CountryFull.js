import React from 'react'
import Weather from './Weather'

const CountryFull = ({ country }) => {
    return (
      <div key={country.name}>
        <h1>{country.name}</h1>
        <p>capital {country.capital} </p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img alt="country-flag" width="200" height="200" src={country.flag}></img>
        <Weather capital={country.capital}/> 
    </div>   
   )
  }

export default CountryFull