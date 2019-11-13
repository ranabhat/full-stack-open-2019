import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { displayNotificationFor } from '../reducers/notificationReducer'

const FormBlogCreate = (props) => {
  //console.log('propps form blog', props)
  const handleCreateBlogPost = async (event) => {
    event.preventDefault() // prevents the default action of submitting a form
    const title = event.target.title.value
    // console.log(title)
    const author = event.target.author.value
    const url = event.target.url.value
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.createBlog(blogObject)
    props.displayNotificationFor( `you created ${title}` , 10)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit= {handleCreateBlogPost}>
        <div>
              title
          {/* <input {...props.title}
            name="Title"
          /> */}
          <input name="title" />
        </div>
        <div>
            author
          {/* <input {...props.author}
            name="Author"
          /> */}
          <input name="author" />
        </div>
        <div>
            url
          {/* <input {...props.url}
            // type={url.type}
            // value={url.value}
            name="Url"
            //onChange={url.onChange}
          /> */}
          <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(null, { createBlog, displayNotificationFor })(FormBlogCreate)
//export default FormBlogCreate



// import React from 'react'

// const FormBlogCreate = ({ handleCreateBlogPost, title, author, url }) => {
//   return (
//     <div>
//       <h2>create new</h2>
//       <form onSubmit= {handleCreateBlogPost}>
//         <div>
//               title
//           <input {...title}
//             name="Title"
//           />
//         </div>
//         <div>
//             author
//           <input {...author}
//             name="Author"
//           />
//         </div>
//         <div>
//             url
//           <input {...url}
//             // type={url.type}
//             // value={url.value}
//             name="Url"
//             //onChange={url.onChange}
//           />
//         </div>
//         <button type="submit">create</button>
//       </form>
//     </div>
//   )
// }

// export default FormBlogCreate