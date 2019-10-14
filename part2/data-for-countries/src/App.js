import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryFull from './components/CountryFull'
import CountryLess from './components/CountryLess'

const App = () => {
  //const [newsearch, setNewSearch] = useState('')
  const [country, setCountry] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

    // Fetching data from server
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
  }, [])

  const countryToShow = showAll
      ? country
      : country.filter(country => country.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)
//   console.log((countryToShow.length > 10) ? 'too many' : countryToShow)
// //  console.log('country', countryToShow)

  const handleSearchChange = (event) => {
    //event.preventDefault()
    setNewSearch(event.target.value)
    setShowAll(false)
  }

  const handleShowClick = name => {
   // console.log('name show pressed', name)
    const whichCountry = countryToShow.filter(country => country.name === name)
   // setCountry(countryToShow.filter(country => country.name === name))
   console.log('which county', whichCountry)
   setCountry(whichCountry)
 
  }

  const rows = () => (countryToShow.length === 1) 
    ? countryToShow.map(country =>
    <CountryFull 
       key={country.name + country.capital}
       country={country}
    />
   )
   : countryToShow.map(country =>
    <CountryLess
       key={country.name + country.capital}
       country={country} handleShowClick={() => handleShowClick(country.name)}
    />
   )
  return(
    <div>
    <Filter filterLabel={'find countries'} handleSearchChange={handleSearchChange} />
    <Countries countries={rows()} />
    </div>
    
  )
}

export default App
