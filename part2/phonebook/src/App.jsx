import { useState } from 'react'


function App() {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '022 340 8965' }])
  const [ newName, setNewName ] = useState( '' )
  const [newNumber, setNewNumber] = useState('')

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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name:{' '}
					<input onChange={handleNameChange} placeholder='Enter person name' />
				</div>
				<div>
					number:{' '}
					<input onChange={handleNumberChange} placeholder='Enter person number' />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons?.map((person, index) => (
        <p key={ index }>{ person.name } { person.number }</p>
			))}
		</div>
	)
}


export default App
