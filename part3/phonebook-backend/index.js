const express = require( 'express' )
const app = express()

app.use(express.json())

const persons = [
	{
		id: 1,
		name: 'Alieu Saidy',
		number: '220 5583 4321',
	},
	{
		id: 2,
		name: 'Mariama Saidy',
		number: '220 2233 9089',
	},
	{
		id: 3,
		name: 'Fatoumata Touray',
		number: '220 6640 2211',
	},
	{
		id: 4,
		name: 'Mariama Sowe',
		number: '220 7732 7030',
	},
]

app.get( '/api/persons', (request, response) => {
    response.json( {data:persons} );
} )

app.get( '/api/persons/info', ( request, response ) => {
    response.send(
        `
        <p>The Phonebook has a info of ${persons.length}</p>
        <p>${new Date()}</p>
        `
    )
} )

app.get( '/api/persons/:id', ( request, response ) => {
    const id = request.params.id     
    
    const query = persons.find( person => person.id == id )

    if ( query ) {
        response.status(201).json({data: query})        
    } else {
        response.status(404).json({error: `No person found with a id of ${id}`})
    }
} )

app.delete( '/api/persons/:id', ( request, response ) => {
    const id = request.params.id

    const query = persons.find( ( person ) => person.id == id )
    
    if ( query ) {
        const filteredPerson = persons.filter( person => person.id.toString() !== id )
        response.status( 201 ).json( {
            data: filteredPerson
        })
    } else {
        response.status( 404 ).json( { error: `No person found with a id of ${id}` } )
    }
} )

app.post( '/api/persons', ( request, response ) => {
    const body = request.body
    
    const id = persons.length + 1
    const newPersons = persons.concat({ id: id, ...body })
    response.status( 201 ).json( {
        data: newPersons
    })
})

const PORT = 3001
app.listen( PORT, () => {
    console.log(`Server stated on ${PORT}`);
})

