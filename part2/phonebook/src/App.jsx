import { useState } from 'react'


function App() {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [ newName, setNewName ] = useState( '' )

  const handleChange = (e) => {
    setNewName(e.target.value)
  }
  
  const handleSubmit = ( e ) => {
    e.preventDefault()

    const content = {
      name: newName
    }

    setPersons(persons.concat(content))
    
  }

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input onChange={handleChange} placeholder='Enter person name' />
				</div>
				<div>
					<button type='submit'>
						add
					</button>
				</div>
			</form>
      <h2>Numbers</h2>
      {

        persons?.map( ( person, index ) => (
          <p key={ index }>{ person.name }</p>
        ))
      }
		</div>
	)
}


export default App
