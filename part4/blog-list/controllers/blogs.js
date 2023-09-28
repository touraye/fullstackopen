const blogsRouter = require( 'express' ).Router()
const Blog = require( '../models/blog' )
const User = require( '../models/user' )
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate('user')
		
		response.json( blogs )
		
	} catch (error) {
		next(error)
	}
} )

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog( request.body )		
	
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
			if (!decodedToken.id) {
				return response.status(401).json({ error: 'token invalid' })
			}
		const user = await User.findById( decodedToken.id )		

		const newObj = new Blog({
			user: user._id,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes			
		})
		
		const newBlog = await newObj.save()
		response.status( 201 ).json( newBlog )			
	} catch (error) {
		next(error);
	}
} )

blogsRouter.delete( '/:id', async ( request, response, next ) => {
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		}

		const user = await User.findById( decodedToken.id )	
		const blog = await Blog.findById( request.params.id )
		
		console.log('blog user', blog.user._id.toString());
		console.log( 'user from token', user._id.toString() )
		if ( blog.user._id.toString() === user._id.toString() ) {
			
			await Blog.findByIdAndRemove( request.params.id )
			response.status( 204 ).end()
		} else {
			response.status( 401 ).json( {
				error: 'unauthorized user'
			})
		}
		
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