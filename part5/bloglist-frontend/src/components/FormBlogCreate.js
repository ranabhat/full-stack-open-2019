import React from 'react'

const FormBlogCreate = ({ handleCreateBlogPost, title, onTitleChange, author, onAuthorChange, url, onUrlChange  }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit= {handleCreateBlogPost}>
        <div>
              title
          <input
            type={title.type}
            value={title.value}
            name="Title"
            onChange={title.onChange}
          />
        </div>
        <div>
            author
          <input
            type={author.type}
            value={author.value}
            name="Author"
            onChange={author.onChange}
          />
        </div>
        <div>
            url
          <input
            type={url.type}
            value={url.value}
            name="Url"
            onChange={url.onChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default FormBlogCreate