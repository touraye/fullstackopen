import { useState } from 'react'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Filtering from './component/Filter'


function App() {
  const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	])
  const [ newName, setNewName ] = useState( '' )
  const [ newNumber, setNewNumber ] = useState( '' )
  const [ filtered, setFiltered ] = useState( '' )

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

    setPersons(persons.concat(content))
    
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
