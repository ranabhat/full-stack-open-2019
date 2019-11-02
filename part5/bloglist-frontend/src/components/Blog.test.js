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

  test('at start only author and title are  displayed', () => {
    const div = component.container.querySelector('.hideBlogDetail')

    expect(div).toHaveTextContent('Mount Everest King of the Mountains')
    expect(div).toHaveTextContent('Shiva Shankar')
    expect(div).not.toHaveTextContent('https://example.com')

  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })

  test('after clicking the name, all blog content are displayed', () => {
    //const div = component.container.querySelector('.blogContent')

    const spanName = component.container.querySelector('.spanTitlePress')
    fireEvent.click(spanName)

    const divShowContent = component.container.querySelector('.allBlogContent')
    // fireEvent.click(div)
    expect(divShowContent).toHaveTextContent('https://example.com')
    expect(divShowContent).toHaveStyle('display: block')

  })

  test('clicking the name after full content display, will only render title and author', () => {
    //const div = component.container.querySelector('.blogContent')

    const spanTitle = component.container.querySelector('.spanTitlePress')
    fireEvent.click(spanTitle)
    fireEvent.click(spanTitle)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})
