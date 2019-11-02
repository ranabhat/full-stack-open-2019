import React from 'react'

const FormBlogCreate = ({ handleCreateBlogPost, title, author, url }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit= {handleCreateBlogPost}>
        <div>
              title
          <input {...title}
            name="Title"
          />
        </div>
        <div>
            author
          <input {...author}
            name="Author"
          />
        </div>
        <div>
            url
          <input {...url}
            // type={url.type}
            // value={url.value}
            name="Url"
            //onChange={url.onChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default FormBlogCreate