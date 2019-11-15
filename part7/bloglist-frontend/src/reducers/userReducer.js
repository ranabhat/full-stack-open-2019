
import loginService from '../services/login'
import blogService from '../services/blogs'
const initialState = {}

const userReducer = (state = initialState, action) => {
  console.log('state user now', state)
  console.log('action user now', action.data)
  switch(action.type) {
  case 'LOGIN':
    console.log('action user now when login', Object.assign({}, action.data))
    return Object.assign({}, action.data)
  case 'KEEPUSER':
    console.log('action user KEEEEEEEEP USEEEERRRR', Object.assign({}, action.data))
    return Object.assign({}, action.data)
  case 'LOGOUT':
    return initialState
  default:
    return state
  }
}
export const login = credentials => {
  return async dispatch => {
    const newUser = await loginService.login(credentials)
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))
    blogService.setToken(newUser.token)
    dispatch({
      type: 'LOGIN',
      data: newUser
    })
  }
}

// export const getUser = () => {
//   return dispatch => {
//     dispatch({
//       type: 'GET_USER'
//     })
//   }
// }
export const keepTheUser = () => {
  return async dispatch => {
    const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
    //console.log('in effect initial local storqage', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'KEEPUSER',
        data: user
      })


    }
  }
}

export const logOut = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }

}

export default userReducer

