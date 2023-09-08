const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest( app )
const Blog = require( '../models/blog' )

const initialBlogs = [
	{
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/nestjs-app-router',
		likes: 10,
	},
	{
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',
		likes: 5,
	},
	{
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',
		likes: 5,
	},
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
		await blogObject.save()
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000 )

test('all blogs are return', async () => {
    const response = await api.get( '/api/blogs' )
    expect(response.body).toHaveLength(initialBlogs.length)
})


afterAll(async () => {
	await mongoose.connection.close()
})