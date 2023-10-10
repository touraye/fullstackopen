const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require( '../app' )
const loginUser = require('./userlist_api.test')


const api = supertest( app )
const Blog = require( '../models/blog' )
const blog = require( '../models/blog' )

const initialBlogs = [
	{
		title: "Nextjs Ebook",
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/nestjs-app-router',
		likes: 10,
	},
	{
		title: "React roadmap 2023",
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',
		likes: 5,
	},
	{
		title: "Tailwind css Ebook",
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
} )



test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 100000 )

test('all blogs are return', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)


test('id field is defined', async () => {
	const response = await api.get('/api/blogs')

	response.body.forEach((blog) => {
		expect(blog.id).toBeDefined()
	})
}, 100000)

test('adding blog with valid user token to the database works', async () => {
	const blogsBeforeSaving = await api.get('/api/blogs')

	const newBlog = {
		title: 'Saving new blog during test',
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',
		likes: '2',
	}

	const token = await loginUser()

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set({ Authorization: `bearer ${token}` })
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAfterSaving = await api
		.get('/api/blogs')
		expect(blogsAfterSaving.body.length)
		.toBeGreaterThan(blogsBeforeSaving.body.length)
		
}, 100000)

test( 'blog without like value is assigned with 0 like ', async () => {
	const newBlog = {
		title: 'Blog with no like property',
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',	
	}

	await api
		.post( '/api/blogs' )
		.send( newBlog )
		.expect( 201 )
	
	const response = await api.get('/api/blogs')		
	expect( response.body[ response.body.length - 1 ].likes ).toBe(0)	
}, 100000)

test('creating new blog with a title return a bad request', async () => {
	const newBlog = {
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',
		likes: 2,
	}

	await api.post( '/api/blogs' ).send( newBlog ).expect( 400 )	
}, 100000)


describe('delete one blog', () => {  
	test('succeeds with status code 204 if id is valid', async () => {
		const blogs = await api.get( '/api/blogs' )	
		const blogToBeDelete = blogs.body[0]		
		
		await api.delete(`/api/blogs/${blogToBeDelete.id}`).expect(204)
		
		const blogsAfterDeletion = await api.get( '/api/blogs' )
		
		expect( blogsAfterDeletion.body ).toHaveLength(
			blogs.body.length - 1
		)
	
		const titles = blogsAfterDeletion.body.map( blog => blog.title )
		
		expect(titles).not.toContain(blogToBeDelete.title)
	}, 100000)
})

describe('updating one blog', () => {
  test('blog likes can be updated', async () => {
	  const blogs = await api.get( '/api/blogs' )
	  const blogToBeUpdated = blogs.body[blogs.body.length - 1]
	  console.log('blogToBeUpdated', blogToBeUpdated)
	  
	  const updateBlog = {
		  likes: 11
	  }

	   const updatedBlog = await api
		   .put( `/api/blogs/${blogToBeUpdated.id}` )
		   .send(updateBlog)
			.expect(202)	  	  
	  
		console.log('updatedBlog', updatedBlog.body)
	  
	//   expect(updatedBlog.body.likes).toBeGreaterThan(blogToBeUpdated.likes)
  })
  
} )

test('Adding a blog fail without token',async() => {
  const newBlog = {
		title: 'Blog without a token',
		author: 'JS Mastery',
		url: 'jsmastery.com/blog/server-client-rendering',
		likes: '2',
  }
	
	await api('/api/blogs').send(newBlog).expect(401)
})



afterAll(async () => {
	await mongoose.connection.close()
})
