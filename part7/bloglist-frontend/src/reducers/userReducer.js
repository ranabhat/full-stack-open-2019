
import loginService from '../services/login'
const initialState = {}

const userReducer = (state = initialState, action) => {
  console.log('state user now', state)
  console.log('action user now', action.data)
  switch(action.type) {
  case 'LOGIN':
    console.log('action user now when login', Object.assign({}, action.data))
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
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(newUser))
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

export const logOut = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
  }

}

export default userReducer

