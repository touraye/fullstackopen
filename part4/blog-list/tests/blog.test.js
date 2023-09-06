const listHelper = require( '../utils/list_helper' )

test('dummy returns one', () => {
	const blogs = [
		{
			tittle: 'Server-Side VS Client-Side Rendering',
			author: 'JS Mastery',
			url: 'jsmastery.com/blog/server-client-rendering',
			likes: '5',
		},
	]

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
} )

describe( 'blog list test', () => {
	test( 'of empty list is zero', ( ) => { 
		const blogs = []

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(0)
	} )

	test('when list has only one blog equals to the likes of that', () => {
		const blogs = [
			{
				author: 'JS Mastery',
				url: 'jsmastery.com/blog/server-client-rendering',
				likes: 5,
				id: '64f70a264b7256df4a522007',
			},
		]

		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(5)
	})
	
	test( 'of bigger list is calculated right', () => {
		const blogs = [
			{
			"author": "JS Mastery",
			"url": "jsmastery.com/blog/nestjs-app-router",
			"likes": 10,
			"id": "64f709954b7256df4a522004"
			},
			{
				"author": "JS Mastery",
				"url": "jsmastery.com/blog/server-client-rendering",
				"likes": 5,
				"id": "64f70a264b7256df4a522007"
			},
			{
				"author": "JS Mastery",
				"url": "jsmastery.com/blog/server-client-rendering",
				"likes": 5,
				"id": "64f71c43759800ce692902e9"
			}
		]
	
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(20)
	} )		
	
} )

describe( 'favorite blog', () => { 
	test( 'blog with the most likes', () => {
		const blogs = [
			{
				author: 'JS Mastery',
				url: 'jsmastery.com/blog/nestjs-app-router',
				likes: 10,
				id: '64f709954b7256df4a522004',
			},
			{
				author: 'JS Mastery',
				url: 'jsmastery.com/blog/server-client-rendering',
				likes: 15,
				id: '64f70a264b7256df4a522007',
			},
			{
				author: 'JS Mastery',
				url: 'jsmastery.com/blog/server-client-rendering',
				likes: 40,
				id: '64f71c43759800ce692902e9',
			},
		]

		const result = listHelper.favoriteBlog( blogs )
		expect(result).toEqual({
			author: 'JS Mastery',
			url: 'jsmastery.com/blog/server-client-rendering',
			likes: 40,
			id: '64f71c43759800ce692902e9',
		})
	})
 })

