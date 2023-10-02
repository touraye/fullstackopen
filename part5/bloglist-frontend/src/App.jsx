import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState( [] )
  const [username, setUsername] = useState('')
  const [ password, setPassword ] = useState( '' )
  const [ user, setUser ] = useState( null )  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [] )
  
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService
        .login( { username, password } )
      setUser( user )
      setUsername( '' )
      setPassword('')
      console.log(user);
    } catch (error) {
      alert('wrong credentials')
    }
  }

  if ( user == null ) {
    return (
      <div>
        <h2>Login to the app</h2>
				<form onSubmit={handleLogin}>
					<div>
						<label htmlFor='username'>Username:</label>
            <input
							onChange={({ target }) => setUsername(target.value)}
              
							type='text'
							placeholder='Enter username'
						/>
					</div>

					<div>
						<label htmlFor='password'>Password:</label>
            <input
							onChange={({ target }) => setPassword(target.value)}
              
							type='password'
							placeholder='Enter password'
						/>
					</div>
					<div>
						<button>login</button>
					</div>
				</form>
			</div>
    )
  }

  return (
		<div>
			
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App