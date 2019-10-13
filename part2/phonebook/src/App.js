import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import axios from 'axios'

const Header = ({ title }) => {
  return(
    <h2>{title}</h2>
  )
}

const Filter = ({ filterLabel, handleSearchChange }) => {
  return(
    <div>
    <p>{filterLabel} <input onChange={handleSearchChange} /></p>
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}> 
    <div>
      name: <input value={newName} onChange={handlePersonChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ persons }) => {
  return(
    <div>{persons}</div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    /*{ name: 'Arto Hellas', number: '22-33-4567' },{ name: 'sina', number: '33-22-7654' }*/
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)

  // Fetching data from server
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  // filter the person array => convert name of each person element to lowercase
  // The index of the first occurrence of searchValue, or -1 if not found
  // Note: The indexOf() method is case sensitive. For example, the following expression returns -1:
  // 'Blue Whale'.indexOf('blue'); // returns -1
  const personToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)

  const rows = () => personToShow.map(person =>
      <Person 
         key={person.name}
         person={person}
      />
    )

  const addPerson = (event) => {
    event.preventDefault()
    console.log('adding person button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    const findPersonDuplicate = persons.find(person => person.name === personObject.name)
    //console.log('ispersonduplicate', findPersonDuplicate)
    if (findPersonDuplicate === undefined) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  
    }
    else {
      alert(`${newName} is already added to phonebook`)
      setPersons(persons)
      setNewName('')
      setNewNumber('')
    } 
  }
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) 
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setShowAll(false)
    //console.log('newSearch', newSearch)
    // const searchItems = () => persons.filter(person => person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)
    // console.log('search items', searchItems())
    // setPersons(searchItems())
  }
 // filter the person array => convert name of each person element to lowercase
 // The index of the first occurrence of searchValue, or -1 if not found
 // Note: The indexOf() method is case sensitive. For example, the following expression returns -1:
 // 'Blue Whale'.indexOf('blue'); // returns -1
 // const searchItems = () => persons.filter(person => person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)
 // console.log('search items', searchItems())
  
  return (
    <div>
      <Header title={'Phonebook'} />
      <Filter filterLabel={'filter show with:'} handleSearchChange={handleSearchChange}/>
      <Header title={'add a new'} />
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Header title={'Numbers'} />
      <Persons persons={rows()} />
    </div>
  )
}

export default App
