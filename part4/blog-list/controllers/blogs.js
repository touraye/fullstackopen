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

module.exports = blogsRouter