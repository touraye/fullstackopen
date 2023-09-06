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

const mostLikes = (blogs) => {
	const topBlogger = {}

	for (const blog of blogs) {
		const author = blog.author
		const likes = blog.likes

		if (topBlogger[author]) {
			topBlogger[author].count++
			topBlogger[author].likes += likes
		} else {
			topBlogger[author] = {
				count: 1,
				likes: likes,
			}
		}
	}

	let mostBlogsAuthor = ''
	let maxBlogCount = 0

	for (const author in topBlogger) {
		if (topBlogger[author].count > maxBlogCount) {
			mostBlogsAuthor = author
			maxBlogCount = topBlogger[author].count
		}
	}

	return { author: mostBlogsAuthor, likes: topBlogger[mostBlogsAuthor].likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,   
    mostLikes
}
