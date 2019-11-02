import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import UserBlog from './components/UserBlog'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)
  const [colorErrorMessage, setColorErrorMessage] = useState('')

  const [user, setUser] = useState(null)
  const [likes, setLikes] = useState('')

  const usernameState = useField('text')
  const passwordState = useField('password')
  const titleState = useField('text')
  const authorState = useField('text')
  const urlState = useField('url')

  /**************************************Fetching data from server *************************************************/
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
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
      const user = await loginService.login({ username: usernameState.value , password: passwordState.value })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      //console.log('logging in with', username, password)
      usernameState.reset = () => usernameState.onChange('')
      passwordState.reset = () => passwordState.onChange('')
      //content.reset()
      usernameState.reset()
      passwordState.reset()
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setColorErrorMessage('errorRed')
      usernameState.reset = () => usernameState.onChange('')
      passwordState.reset = () => passwordState.onChange('')
      usernameState.reset()
      passwordState.reset()
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
    usernameState.reset = () => usernameState.onChange('')
    passwordState.reset = () => passwordState.onChange('')
    usernameState.reset()
    passwordState.reset()
  }
  /*************************************************************************************************************/

  /**************************************When user logged in handle Blog Create *************************************************/
  const handleLikeClick = id => () => {
    const blog = blogs.find(blog => blog.id === id)
    const blogObject = {
      title: blog.title,
      likes: blog.likes,
      author: blog.author,
      url: blog.url,
      user: blog.user
    }
    blogService
      .update(blog.id, blogObject)
      .then(() => {
        setLikes(blogs.find(blog => blog.id === id).likes += 1)

      })
    setBlogs(blogs)
  }


  const handleCreateBlogPost = (event) => {
    event.preventDefault() // prevents the default action of submitting a form
    const title = titleState.value
    const author = authorState.value
    const url = urlState.value
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
        titleState.reset = () => titleState.onChange('')
        authorState.reset = () => authorState.onChange('')
        urlState.reset = () => urlState.onChange('')
        //content.reset()
        titleState.reset()
        authorState.reset()
        urlState.reset()
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const handleDeleteBlogPost = id => () => {
    const findBlogToDelete = blogs.find(blog => blog.id === id)
    if( window.confirm(`remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)) {

      blogService
        .deletes(findBlogToDelete.id, findBlogToDelete)
        .then(() => {
          //window.confirm(`remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)
          setBlogs(blogs.filter(blog => blog.id !== findBlogToDelete.id))
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  }

  /*************************************************************************************************************/
  //console.log('app toimi')
  return(
    <div>
      {/* <h2>Log in to application</h2> */}
      {user === null
        ? <LoginForm username={usernameState}
          password={passwordState}
          message={errorMessage}
          colorErrorMessage={colorErrorMessage}
          handleLogin={handleLogin}
        />

        : <UserBlog likes={likes}
          deleteClick={handleDeleteBlogPost} likeClick={handleLikeClick}
          user={user} blogs={blogs} handleLogOut={handleLogOut}
          message={errorMessage} colorErrorMessage={colorErrorMessage}
          title={titleState}
          author={authorState}
          url={urlState}
          handleCreateBlogPost={handleCreateBlogPost}
        />
      }
    </div>
  )
}

export default App
