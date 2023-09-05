/* eslint-disable react/prop-types */
import Person from './Person'

const Persons = ( { filteredPerson, onDelete } ) => {    
    return (
        <ul>
            {
                filteredPerson?.map( ( person ) => (                    
                    <Person
                        key={person.id}
                        person={ person }
                        onDelete={()=> onDelete(person)}
                    />
                ))
            }
        </ul>
    )
}

export default Persons
