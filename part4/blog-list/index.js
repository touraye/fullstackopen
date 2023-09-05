const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.set('strictQuery', false)
const mongoUrl = 'mongodb://0.0.0.0:27017/bloglist'

console.log( 'Connecting to MongoDB... ', mongoUrl );

mongoose.connect( mongoUrl )
    .then( result => {
    console.log('Mongodb connected');
    } )
    .catch( error => console.log( 'Error connecting to MongDB', error.message ) )

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)

	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
