/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Filtering from './component/Filter'
import services from './service/person'
import Notification from './component/Notification'


function App() {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState( '' )
  const [ newNumber, setNewNumber ] = useState( '' )
  const [ filtered, setFiltered ] = useState( '' )
  const [ notifyMessage, setNotifyMessage ] = useState( '' );
  const [ messageType, setMessageType ] = useState( null )  

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

    const personExist = persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )
   
    if (personExist) {
      updateNumber(personExist)
    } else {

       const content = {
					name: newName,
					number: newNumber,
				}
      
        services
          .addPerson( content )
          .then( response => {
          setPersons( persons.concat( response.data ) )
          } )
      
      setNewName( '' )      
      setNewNumber( '' )
      
      setMessageType('success')
      setNotifyMessage( `Added ${newName}` )
      
      setTimeout(() => {
        setMessageType(null)
        setNotifyMessage( null )
			}, 5000)
    }
      
  }

  const updateNumber = ( personExist ) => {
    if (window.confirm(
				`${personExist.name} is already added to phonebook. Replace the old number with new number?`
			)
    ) {    
      
      const newObject = {
				...personExist,
				number: newNumber,
			}
      
      services
        .updatePerson( personExist.id, newObject )
        .then( ( response ) => {          
				setPersons(
					persons.map((person) =>
						person.id !== personExist.id ? person : response.data
					)
				)
			})
		}
  }


  const handleDelete = ( deletePerson ) => {
    if ( window.confirm( `Delete ${deletePerson.name}?` ) ) {
      const newPersons = persons.filter(person => person.id !== deletePerson.id)
      
      services
        .deletePerson( deletePerson.id )
        .then( ( response ) => {
			setPersons(newPersons)
        } ).catch( error => {         
          setMessageType('error')
          setNotifyMessage(
						`${deletePerson.name} was already deleted from the server`
					)
          setPersons( persons.filter( person => person.id !== deletePerson.id ) )
          
          setTimeout( () => {
            setMessageType(null)
            setNotifyMessage('')
          }, 5000)
    })
    }
  }

  const handleFilter = (e) => setFiltered(e.target.value)

  const filteredPerson = persons.filter( person => person.name.toLowerCase().indexOf( filtered.toLowerCase() ) !== - 1 )    

	return (
		<div>
      <h2>Phonebook</h2>
      
      <Notification
        message={ notifyMessage }
        messageTye={messageType}
      />

			<Filtering handleFilter={handleFilter} />

			<PersonForm
				handleSubmit={handleSubmit}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>

      <Persons
        filteredPerson={ filteredPerson }
        onDelete={ handleDelete }
      />
		</div>
	)
}


export default App
