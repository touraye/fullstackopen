const express = require( 'express' )
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use( express.json() )
app.use(cors())
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

morgan.token('body', (request, response) => {
  if (!request.body.name) return

  return JSON.stringify(request.body)
})


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
    const {name, number} = request.body    

    if ( name !== undefined && number !== undefined) {

        const personExist = persons.find( person => person.name.toLowerCase() === name.toLowerCase() )
        
        if ( personExist ) {
            return response.status( 400 ).json( {
                error: 'name must be unique'
            })
        }
        
        const id = persons.length + 1
        const newObject = {
            id,
            name,
            number
        }
        persons.concat(newObject)
        response.status( 201 ).json( {
            data: newObject
        })
        
    } else {
        response.status(400).json({error: 'name or number is missing'})
    }
    
} )

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen( PORT, () => {
    console.log(`Server stated on ${PORT}`);
})

