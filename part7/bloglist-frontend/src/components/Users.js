import React from 'react'
import { connect } from 'react-redux'
import {
//  BrowserRouter as Router,
//  Route,  Redirect,
  Link,
  withRouter
} from 'react-router-dom'
import { Table } from 'semantic-ui-react'
// import Notification from './Notification'
// import Togglable from './Togglable'
// import FormBlogCreate from './FormBlogCreate'
//import Blog from './Blog'
//import User from './User'
import { logOut } from '../reducers/userReducer'

let Users = (props) => {
  // const handleLogOut = () => {
  //   props.logOut()
  // }
  return(
    <div>
      {/* <Router> */}
      <h2>blog app</h2>
      {/* <Notification  /> */}
      {/* <div> <p>{props.user.name} is logged in
        <button onClick={() => {
          props.logOut()
          props.history.push('/')
        }
        }>
          logout</button></p></div> */}
      <div>
        <h2>Users</h2>
        {/* <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {props.blogsToShow.map(blog =>
              <tr key={blog[0]}>
                <td>
                  <Link to={`/users/${blog[0]}`}>
                    {blog[1][0].name}
                  </Link>
                </td>
                <td>{blog[1].length}</td>
              </tr>

            )}
          </tbody>
        </table> */}
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Users</Table.HeaderCell>
              <Table.HeaderCell>blogs created</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.blogsToShow.map(blog =>
              <Table.Row key={blog[0]}>
                <Table.Cell>
                  <Link to={`/users/${blog[0]}`}>
                    {blog[1][0].name}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {blog[1].length}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>

      </div>

      {/* </Router> */}
    </div>
  )
}

// const blogsToShow = ({ blogs }) => {
//   console.log(blogs)
//   return blogs.sort((a, b) => a.likes - b.likes)
// }


const mapStateToProps = (state) => {
  console.log('yes state blogssss', state.blogs)
  const lomb =  state.blogs.map(blogs => blogs.user)
  const groupBy = (objectArray, property)  => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }
  const groupByUserId = groupBy(lomb, 'id')
  console.log('group by user id',Object.entries(groupByUserId))

  const tomb = state.blogs.map(blogs => blogs.user.name)
  console.log('tomb', tomb)
  const countedNames = tomb.reduce( (allNames, name) => {
    if (name in allNames) {
      allNames[name]++
    }
    else {
      allNames[name] = 1
    }
    return allNames
  }, {})
  console.log('countedNames', countedNames)
  console.log('arrayCountedNames', (Object.entries(countedNames)))

  console.log('user state in Users for User', state.user)
  const userById = (id) =>
    Object.entries(groupByUserId).find(a => a[0] === id)

  console.log('user by id', userById('5db03518eec6bb0ae4f589a0'))

  return {
    blogsToShow: Object.entries(groupByUserId),
    user: state.user
  }
}

const mapDispatchToProps = {
  logOut,
}
Users = withRouter(Users)

export default connect(mapStateToProps, mapDispatchToProps)(Users)