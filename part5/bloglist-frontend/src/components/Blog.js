import React from 'react'
import BlogPostTogglable from './BlogPostTogglable'

const Blog = ({ blog, likeClick, deleteClick, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(username)
  // console.log('likes', likes=== '')
  //console.log('bloglikes', blog.likes)
  //console.log('blog', blog.user===undefined ? null : blog.user.name)
  return(
    <div style={blogStyle} >
      {/* <div onClick={() => console.log('clicked')}> */}
      <BlogPostTogglable titleLabel={blog.title} authorLabel={blog.author}>
        <div className="allBlogContent">
          {blog.url} <br/>
          {blog.likes + ' likes'} <button onClick={likeClick(blog.id)}>likes</button><br/>
          {`Added by ${blog.user.name===undefined ? username : blog.user.name}`} <br/>
          {username === blog.user.name ?
            <button onClick={deleteClick(blog.id)}>remove</button>
            : null
          }
        </div>
      </BlogPostTogglable>

    </div>
    // </div>
  )
}

export default Blog