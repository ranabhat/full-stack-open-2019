import React, {useState} from 'react'
import BlogPostTogglable from './BlogPostTogglable'

const Blog = ({ blog, likeClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
//console.log('blog', blog.user===undefined ? null : blog.user.name)
  return(
    <div style={blogStyle}>
      {/* <div onClick={() => console.log('clicked')}> */}
        <BlogPostTogglable titleLabel={blog.title} authorLabel={blog.author}>
        <div>
        {blog.url} <br/>
        {blog.likes + ` likes`} <button onClick={likeClick}>likes</button><br/>
        {`Added by ${blog.user===undefined ? 'No user' : blog.user.name}`}
        </div>
        </BlogPostTogglable>
       
      </div>
    // </div>
  )
}

export default Blog