import React from 'react'

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

export default FormBlogCreate