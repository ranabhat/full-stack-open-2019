import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state blogReducer now: ', state)
  console.log('action blogReducer', action)
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE':
    // eslint-disable-next-line no-case-declarations
    const id = action.data.id
    // eslint-disable-next-line no-case-declarations
    const blogToLike = state.find(n => n.id === id)
    // eslint-disable-next-line no-case-declarations
    const changedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  case 'ADD_COMMENT':
    // eslint-disable-next-line no-case-declarations
    return state.map(blog => (blog.id === action.data.id) ? action.data : blog)

  case 'DELETE_BLOG':
    return action.data
  case 'INIT_BLOGS':
    return action.data
  // case 'SET_TOKEN':
  //   return state
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const commentBlog = (id, content) => {
  return async dispatch => {
    const withCommentBlog = await blogService.comment(id, content)
    dispatch({
      type: 'ADD_COMMENT',
      data: withCommentBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToDelete = blogs.find(n => n.id === id)
    await blogService.deletes(id, blogToDelete)
    const remainingBlog = blogs.filter(blog => blog.id !== blogToDelete.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: remainingBlog
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToLike = blogs.find(n => n.id === id)
    const newBlogContent = {
      title: blogToLike.title,
      likes: blogToLike.likes + 1,
      author: blogToLike.author,
      url: blogToLike.url,
      user: blogToLike.user
    }
    const updateBlogs = await blogService.update(id, newBlogContent)
    console.log('updateBlogs', updateBlogs)
    dispatch({
      type: 'LIKE',
      data: { id },
    })
  }
}

// export const setTokenForUser = token => {
//   return  dispatch => {
//     blogService.setToken(token)
//     dispatch({
//       type: 'SET_TOKEN',
//     })
//   }
// }


export default blogReducer