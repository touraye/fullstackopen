const express = require( 'express' )
const app = express()

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
})

const PORT = 3001
app.listen( PORT, () => {
    console.log(`Server stated on ${PORT}`);
})

