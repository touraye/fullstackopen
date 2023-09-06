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
})