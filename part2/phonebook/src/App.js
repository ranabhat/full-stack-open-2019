import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Persons from './components/Persons'

const Header = ({ title }) => {
  return(
    <h2>{title}</h2>
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
  const [errorMessage, setErrorMessage] = useState(null)
  const [colorErrorMessage, setColorErrorMessage] = useState('')

  // Fetching data from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
         person={person} handleDeleteClick={() => handleDeleteClick(person.id)}
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
      personService
        .create(personObject)
        .then(returnedPerson => {
            //alert(`Added ${personObject.name} to phonebook.`)
            setErrorMessage(
              `Added ${personObject.name} to phonebook.`
            )
            setColorErrorMessage('error')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
      })
    }
    else {
      personService 
        .update(findPersonDuplicate.id, personObject)
        .then(() => {
          persons.find(person => person.name === personObject.name).number = personObject.number
         // alert(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
         setErrorMessage(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
          )
         setColorErrorMessage('error')
         setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
          setPersons(persons)
         // console.log('update person', persons)
          setNewName('')
          setNewNumber('')
        })
      //alert(`${newName} is already added to phonebook`)
      //setPersons(persons)
       .catch(error => {
         //alert(`note has been deleted`)
         setErrorMessage(
          `Information of ${personObject.name} has already been removed from the server.`
          )
         setColorErrorMessage('errorRed')
         setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
          setPersons(persons)
          setNewName('')
          setNewNumber('')

       })
    } 
  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value) 
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setShowAll(false)
  }
  const handleDeleteClick = id => {
   // console.log('delete is pressed')
   const findPersonToDelete = persons.find(person => person.id === id)
   personService
      .deletes(findPersonToDelete.id, findPersonToDelete)
      .then(() => {
        const afterDeleteRemainingPerson = persons.filter(person => person.id !== findPersonToDelete.id)
       // console.log('after delete remaining person', afterDeleteRemainingPerson)
       // alert(`Delete ${findPersonToDelete.name} ?`)
       setErrorMessage(
        `Delete ${findPersonToDelete.name} from phonebook.`
      )
      setColorErrorMessage('errorRed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(afterDeleteRemainingPerson)
      setNewName('')
      setNewNumber('')
      })
  }
  
  return (
    <div>
      <Header title={'Phonebook'} />
      <Notification message={errorMessage} colorErrorMessage={colorErrorMessage} />
      <Filter filterLabel={'filter show with:'} handleSearchChange={handleSearchChange}/>
      <Header title={'add a new'} />
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Header title={'Numbers'} />
      <Persons persons={rows()} />
    </div>
  )
}

export default App
