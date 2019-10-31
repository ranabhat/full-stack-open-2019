import React from 'react'
import Notification from './Notification'
import Togglable from './Togglable'
import FormBlogCreate from './FormBlogCreate'
import Blog from './Blog'

const UserBlog = ({ likeClick, deleteClick, message, colorErrorMessage, user, blogs, handleLogOut, handleCreateBlogPost, title, onTitleChange, author, onAuthorChange, url, onUrlChange }) => {
  //console.log('userblogs', blogs)
  /* Sort BlogPost By Number of Likes */
  const sortBlogsByLikes = blogs.sort((a, b) => a.likes - b.likes)
  //console.log(sortBlogsByLikes)
  return(
    <div>
      <h2>blogs</h2>
      <Notification message={message} colorErrorMessage={colorErrorMessage} />
      <div> <p>{user.name} is logged in
        <button onClick={handleLogOut}>logout</button></p></div>
      <div>
        <Togglable buttonLabel="new blog">
          <FormBlogCreate title={title}
            author={author}
            url={url}
            handleCreateBlogPost={handleCreateBlogPost}
            onTitleChange={onTitleChange}
            onAuthorChange={onAuthorChange}
            onUrlChange={onUrlChange}
          />
        </Togglable>
        {sortBlogsByLikes.map(blog =>
          <Blog key={blog.id} blog={blog} likeClick={likeClick} username={user.name} deleteClick={deleteClick} /> )}
      </div>
    </div>
  )
}

export default UserBlog