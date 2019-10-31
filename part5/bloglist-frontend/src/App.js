import React, { useState, useEffect } from 'react'

import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import UserBlog from './components/UserBlog'

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
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
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

  const handleDeleteBlogPost = id => () => {

    const findBlogToDelete = blogs.find(blog => blog.id === id)
    blogService
      .deletes(findBlogToDelete.id, findBlogToDelete)
      .then(() => {
        window.confirm(`remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)
        setBlogs(blogs.filter(blog => blog.id !== findBlogToDelete.id))
      })
      .catch(error => {
        console.log(error.message)
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

        : <UserBlog likes={likes}
          deleteClick={handleDeleteBlogPost} likeClick={handleLikeClick}
          user={user} blogs={blogs} handleLogOut={handleLogOut}
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
