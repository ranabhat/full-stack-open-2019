import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import UserBlog from './components/UserBlog'

const WrapperBlog = (props) => {
  return (
    <UserBlog
      blogs={props.blogs}
      user={props.user}
      likeClick={props.likeClick}
    />
  )
}

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    // component.debug()
    expect(component.container).toHaveTextContent(
      'login to the application'
    )
    expect(component.container).not.toHaveTextContent(
      'Jest cheatsheet'
    )
    expect(component.container).toHaveTextContent(
      'username'
    )
    expect(component.container).toHaveTextContent(
      'password'
    )
    const formDiv = component.getByText('username')
    expect(formDiv).toHaveStyle('display: block')
  })

  test('if user is undefined, not any blogs are rendered', async () => {
    const user = undefined
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    //console.log(localStorage.getItem('loggedBlogAppUser'))
    if (!localStorage.getItem('loggedBlogAppUser')) {
      const component = render(
        <App  />
      )
      component.rerender(<App />)

      await waitForElement(
        () => component.getByText('login')
      )
      // component.debug()
      expect(component.container).toHaveTextContent(
        'login to the application'
      )
      expect(component.container).toHaveTextContent(
        'username'
      )
      expect(component.container).toHaveTextContent(
        'password'
      )
      expect(component.container).not.toHaveTextContent(
        'Jest cheatsheet'
      )
      const formDiv = component.getByText('username')
      expect(formDiv).toHaveStyle('display: block')
    }
  })

  test('renders all blogs when login successfully', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    const blog= [{
      title: 'Jest cheatsheet',
      author: 'Rico Sta. Cruz',
      url: 'https://devhints.io/jest',
      likes: 409,
      user: {
        username: 'bronepeace',
        name: 'Paribesh Ranabhat',
        id: '5db015f5a9eef7044b81642d'
      },
      id: '5db0537f12bf700fc36b84e2'
    },
    {
      title: 'Ikigai The Japanese Secret',
      author: 'Thomas Oppong',
      url: 'https://medium.com/thrive-global/ikigai-the-japanese-secret-to-a-long-and-happy-life-might-just-help-you-live-a-more-fulfilling-9871d01992b7',
      likes: 52,
      user: {
        username: 'itTech',
        name: 'Bikesh Maharjan',
        id: '5db03518eec6bb0ae4f589a0'
      },
      id: '5db34b376f1265042590358a'
    }]
    const likeClick = jest.fn()
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    if (localStorage.getItem('loggedBlogAppUser')) {
      const component = render(
        <WrapperBlog blogs={blog} user={user} likeClick={likeClick} />
      )

      await waitForElement(
        () => component.getByText('logout')
      )
      expect(component.container).toHaveTextContent(
        'Jest cheatsheet'
      )
      expect(component.container).toHaveTextContent(
        'Ikigai The Japanese Secret'
      )
      expect(component.container).not.toHaveTextContent(
        'login'
      )
      //component.debug()
    }
  })

})