import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Mount Everest King of the Mountains',
      author: 'Shiva Shankar',
      url: 'https://example.com',
      likes: 3,
      id: '5defghjutfrr',
      user: {
        name: 'Paribesh'
      }
    }
    component = render(
      <Blog blog={blog} likeClick={mockHandler} />

    )
    //component.debug()
  })

  test('at start only author and title are not displayed', () => {
    const div = component.container.querySelector('.hideBlogDetail')

    expect(div).toHaveTextContent('Mount Everest King of the Mountains')
    expect(div).toHaveTextContent('Shiva Shankar')
    expect(div).not.toHaveTextContent('https://example.com')

  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })

  test('after clicking the like button, all blog content are displayed', () => {
    //const div = component.container.querySelector('.blogContent')

    const div = component.container.querySelector('.paraPressed')
    fireEvent.click(div)

    const div1 = component.container.querySelector('.allBlogContent')
    // fireEvent.click(div)
    expect(div1).toHaveTextContent('https://example.com')
    expect(div).toHaveStyle('display: block')

  })

  test('after clicking the like button after all blog content are displayed, only display name and author', () => {
    //const div = component.container.querySelector('.blogContent')

    const para = component.container.querySelector('.paraPressed')
    fireEvent.click(para)
    fireEvent.click(para)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})
