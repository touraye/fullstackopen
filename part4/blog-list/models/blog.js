const mongoose = require( 'mongoose' )

const blogSchema = mongoose.Schema( {
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    likes: {
        type: Number,
        default: 0
    }
} )

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Blog', blogSchema)