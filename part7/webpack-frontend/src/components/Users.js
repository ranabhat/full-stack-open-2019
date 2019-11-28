import React from 'react'
import { connect } from 'react-redux'
import {
  Link,
  withRouter
} from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { logOut } from '../reducers/userReducer'

let Users = (props) => {
  return(
    <div>
      <h2>blog app</h2>
      <div>
        <h2>Users</h2>
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
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log('yes state blogssss', state.blogs)
  const blogsUserArray =  state.blogs.map(blogs => blogs.user)
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
  const groupByUserId = groupBy(blogsUserArray, 'id')
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