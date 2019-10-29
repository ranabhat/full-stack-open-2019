import React, { useState, useEffect } from 'react'

import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogPostTogglable from './components/BlogPostTogglable'
//import Blog from './components/Blog'


const LoginForm = ({ message, colorErrorMessage, handleLogin, username, password, onUsernameChange, onPasswordChange }) => {

  return(
    <>
    <h2>login to the application</h2>
    <Notification message={message} colorErrorMessage={colorErrorMessage} />
    <form onSubmit= {handleLogin}>
        <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={onUsernameChange}
                />
        </div>
        <div>
            password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={onPasswordChange}
                />
        </div>
        <button type="submit">login</button>     
    </form>
    </>
  )

}

const FormBlogCreate = ({ handleCreateBlogPost, title, onTitleChange, author, onAuthorChange, url, onUrlChange  }) => {
  return (
    <div>
      <h2>create new</h2>
    <form onSubmit= {handleCreateBlogPost}>
      <div>
            title
              <input
              type="text"
              value={title}
              name="Title"
              onChange={onTitleChange}
              />
      </div>
      <div>
          author
              <input
              type="text"
              value={author}
              name="Author"
              onChange={onAuthorChange}
              />
      </div>
      <div>
          url
              <input
              type="url"
              value={url}
              name="Url"
              onChange={onUrlChange}
              />
      </div>
      <button type="submit">create</button>     
  </form>
    </div>
  )
}

const UserBlog = ({ likeClick, message, colorErrorMessage, user, blogs, handleLogOut, handleCreateBlogPost, title, onTitleChange, author, onAuthorChange, url, onUrlChange }) => {
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={message} colorErrorMessage={colorErrorMessage} />
      <div> <p>{user.name} is logged in 
      <button onClick={handleLogOut}>logout</button></p></div>
      <div>
      <Togglable buttonLabel="new note">
        <FormBlogCreate title={title}
          author={author}
          url={url}
          handleCreateBlogPost={handleCreateBlogPost}
          onTitleChange={onTitleChange}
          onAuthorChange={onAuthorChange}
          onUrlChange={onUrlChange}
          />
      </Togglable>
      {blogs.map(blog => 
      <Blog key={blog.id} blog={blog} likeClick={likeClick} /> )}
      </div>
    </div>
  )
}

const Blog = ({ blog, likeClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 // console.log('likes', likes=== '')
  //console.log('bloglikes', blog.likes)
//console.log('blog', blog.user===undefined ? null : blog.user.name)
  return(
    <div style={blogStyle}>
      {/* <div onClick={() => console.log('clicked')}> */}
        <BlogPostTogglable titleLabel={blog.title} authorLabel={blog.author}>
        <div>
        {blog.url} <br/>
        {blog.likes + ` likes`} <button onClick={likeClick(blog.id)}>likes</button><br/>
        {`Added by ${blog.user===undefined ? 'No user' : blog.user.name}`}
        </div>
        </BlogPostTogglable>
       
      </div>
    // </div>
  )
}

const Notification = ({ message, colorErrorMessage }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={colorErrorMessage}>
      {message}
    </div>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [colorErrorMessage, setColorErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  /**************************************Fetching data from server *************************************************/
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /**************************************Login Form handler *************************************************/
  const handleLogin = async (event) => {
    event.preventDefault()
    try { 
      const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
    blogService.setToken(user.token)
    setUser(user)
    console.log('logging in with', username, password)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong username or password')
    setColorErrorMessage('errorRed')
    setUsername('')
    setPassword('')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogOut = () => {  
    window.localStorage.clear()  
    setUser(null) 
    setUsername('')
    setPassword('')
 }
/*************************************************************************************************************/

 /**************************************When user logged in handle Blog Create *************************************************/
 const handleLikeClick = id => () => {
  //console.log(blogs)
//event.preventDefault()
  
  const blog = blogs.find(blog => blog.id === id)
  const blogObject = {
    title: blog.title,
    likes: blog.likes,
    author: blog.author,
    url: blog.url,
    user: blog.user
  } 

 // console.log(blog)
 // console.log(id)
 // setLikes(() => blogs.find(blog => blog.id === id).likes + 1)
  blogService
    .update(blog.id, blogObject)
    .then(() => {
      setLikes(blogs.find(blog => blog.id === id).likes += 1)

    })
    setBlogs(blogs)
    //console.log('blog likes', blog.likes + 1)
   // setLikes(blog.likes + 1  )
    //console.log('likes', likes==='' ? blog.likes + 1 : likes + 1 )
    
    
  
 }
 const handleCreateBlogPost = (event) => {
  event.preventDefault() // prevents the default action of submitting a form
  
  const blogObject = {
    title: title,
    author: author,
    url: url,
}

  blogService
    .create(blogObject)
    .then(returnedBlog => {
        setErrorMessage(
          `a new blog ${title} by ${author} added`
        )
        setColorErrorMessage('error')
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  })

 }

 const handleTitle = (event) => {
   setTitle(event.target.value)
 }
 const handleAuthor = (event) => {
   setAuthor(event.target.value)
 }
 const handleUrl = (event) => {
   setUrl(event.target.value)
 }
/*************************************************************************************************************/
  console.log('app toimi')
  return(
    <div>
    {/* <h2>Log in to application</h2> */}
    {user === null 
     ? <LoginForm message={errorMessage} colorErrorMessage={colorErrorMessage} handleLogin={handleLogin}
         username={username} password={password}
         onUsernameChange={handleUsername} onPasswordChange={handlePassword} /> 
         
     : <UserBlog likes={likes} likeClick={handleLikeClick} user={user} blogs={blogs} handleLogOut={handleLogOut}
         message={errorMessage} colorErrorMessage={colorErrorMessage}
         title={title}
         author={author}
         url={url}
         handleCreateBlogPost={handleCreateBlogPost}
         onTitleChange={handleTitle}
         onAuthorChange={handleAuthor}
         onUrlChange={handleUrl}
         /> 
    }
    </div>
  )
}

export default App
