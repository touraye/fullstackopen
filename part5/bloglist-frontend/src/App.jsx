import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [ blogs, setBlogs ] = useState( [] )
  const [username, setUsername] = useState('')
  const [ password, setPassword ] = useState( '' )
  const [ user, setUser ] = useState( null )  
  const [ title, setTitle ] = useState( '' )
  const [ author, setAuthor ] = useState( '' )
  const [ url, setUrl ] = useState( '' )
  const [ message, setMessage ] = useState( null )  
  const [ type, setType ] = useState( null )  
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [] )

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem( 'loggedUser' )
    
    if ( loggedUserJSON){
      const user = JSON.parse( loggedUserJSON )
      setUser(user)
    }
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService
        .login( { username, password } )
      
      setUsername( '' )
      setPassword('')
      
      window.localStorage.setItem( 'loggedUser', JSON.stringify( user ) )
      blogService.setToken( user.token )
      setUser(user)      
    } catch (error) {
      handleNotification('Wrong Credentials', 'error')              
    }
  }

  const handleLogout = () => window.localStorage.clear()

  const handleAddBlog = async ( e ) => {
    e.preventDefault()
    try {
      const blog = await blogService.create( { title, author, url } )
      setBlogs( blogs.concat( blog ) )
      setTitle( '' )
      setAuthor( '' )
      setUrl( '' )
      handleNotification(`New blog: ${blog.title}`, 'success')
      return
    } catch (error) {      
      handleNotification('Fail to add blog', 'error')
    }
  }

  const handleNotification = ( message, type ) => {   
    setMessage( message )
    setType( type )
    
    setTimeout( () => {
      setMessage( '' )
      setType( '' )
      
    }, 5000)
  }

  if ( user == null ) {
    return (
			<div>
				<h2>Login to the app</h2>
				<Notification message={message} type={type} />
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
      <Notification message={message} type={type} />
			<h2>blogs</h2>
			<div>
				{user?.username} logged in{' '}
				<button onClick={() => handleLogout()}>logout</button>
			</div>
			<br />
			<div>
				<form onSubmit={handleAddBlog}>
					<div>
						<label htmlFor='title'>Title</label>
						<input
							value={title}
							onChange={({ target }) => setTitle(target.value)}
							type='text'
						/>
					</div>
					<div>
						<label htmlFor='author'>Author</label>
						<input
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
							type='text'
						/>
					</div>
					<div>
						<label htmlFor='url'>Url</label>
						<input
							value={url}
							onChange={({ target }) => setUrl(target.value)}
							type='text'
						/>
					</div>

					<button>Create</button>
				</form>
			</div>
			<br />
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App