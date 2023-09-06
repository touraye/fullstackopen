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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
