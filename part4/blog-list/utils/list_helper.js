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

module.exports = {
    dummy,
    totalLikes
}
