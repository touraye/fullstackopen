const dummy = (blogs) => {
    return 1
}

const totalLikes = ( blogs ) => {
    let numberOfLikes = 0

    for (let blog of blogs) {
			numberOfLikes += blog.likes
		}
   
    return blogs.length === 0 
        ? 0 :
        numberOfLikes
        
}

const favoriteBlog = (blogs) => {
	let maxLikes = -1
	let favBlog = null

	for (let blog of blogs) {
		if (blog.likes > maxLikes) {
			maxLikes = blog.likes
			favBlog = blog
		}
	}

	return favBlog
}

const mostBlogs = (blogs) =>{
	const authorBlogs = {}

	for (const blog of blogs) {
		const author = blog.author

		if (authorBlogs[author]) {
			authorBlogs[author]++
		} else {
			authorBlogs[author] = 1
		}
	}
	authorBlogs
	let authorWithTheMostBlog = ''
	let blogCount = 0

	for (const author in authorBlogs) {
		if (authorBlogs[author] > blogCount) {
			authorWithTheMostBlog = author
			blogCount = authorBlogs[author]
		}
	}

	return { author: authorWithTheMostBlog, blog: blogCount }
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,    
}
