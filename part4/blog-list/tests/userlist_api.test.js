const mongoose = require('mongoose')
const supertest = require( 'supertest' )
const  bcrypt  = require('bcrypt')
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

const loginUser = async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('secret', 10)

	const user = new User({
		username: 'root',
		passwordHash,
	})

	await user.save()

	const userToLogin = {
		username: 'root',
		password: 'secret',
	}

	const response = await api
		.post('/api/login')
		.send(userToLogin)
		.expect(200)
        .expect( 'Content-Type', /application\/json/ )    

	return response.body.token
}

module.exports = loginUser


afterAll(async () => {
	await mongoose.connection.close()
})
