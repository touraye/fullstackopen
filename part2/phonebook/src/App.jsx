import { useEffect, useState } from 'react'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Filtering from './component/Filter'
import services from './service/person'


function App() {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState( '' )
  const [ newNumber, setNewNumber ] = useState( '' )
  const [ filtered, setFiltered ] = useState( '' )

  useEffect( () => {
    services
      .getAll()
      .then( ( response ) => setPersons( response.data ) )    
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
		setNewNumber(e.target.value)
	}
  
  const handleSubmit = ( e ) => {
    e.preventDefault()

    const content = {
      name: newName,
      number: newNumber
    }

    const personExist = persons.find( person => person.name.toLowerCase() === content.name.toLowerCase() )
   
    if ( personExist ) {
      return alert(`${content.name} is already added to phonebook`)
    }

    services
      .addPerson( content )
      .then( response => {
      setPersons( persons.concat( response.data ) )
      setNewName( '' )
      setNewNumber('')
    })
      
  }

  const handleFilter = (e) => setFiltered(e.target.value)

  const personLookUp = persons.filter( person => person.name.toLowerCase().indexOf( filtered.toLowerCase() ) !== - 1 )    

	return (
		<div>
			<h2>Phonebook</h2>
			
      <Filtering handleFilter={handleFilter} />
			
			<PersonForm
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      
			<Persons persons={personLookUp} />
		</div>
	)
}


export default App
