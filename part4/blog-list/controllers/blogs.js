const blogsRouter = require( 'express' ).Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({})
		
		response.json( blogs )
		
	} catch (error) {
		next(error)
	}
})

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body)

	try {
		const newBlog = await blog.save()
		response.status( 201 ).json( newBlog )			
	} catch (error) {
		next(error);
	}
} )

blogsRouter.delete( '/:id', async ( request, response, next ) => {
	try {
		await Blog.findByIdAndRemove( request.params.id )
		response.status( 204 ).end()
	} catch (error) {
		next(error)
	}
} )

blogsRouter.put( '/:id', async ( request, response, next ) => {
	try {
		const updatedBlogs = await Blog.findByIdAndUpdate( request.params.id, request.body, { new: true }
		)
		
		response.status( 202 ).json( updatedBlogs )		
	} catch (error) {
		next(error)
	}
})

module.exports = blogsRouter