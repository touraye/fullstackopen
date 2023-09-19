const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require( '../models/user' )

describe('user creation', () => {
    test('invalid users are not created', async () => {
        const newUser = {
            username: '',
            name: 'testing man1',
            password: 'secret',
        }

        await api
            .post( '/api/users' )
            .send( newUser )
            .expect( 400 )
        
		}, 100000)
    
} )


afterAll(async () => {
	await mongoose.connection.close()
})
