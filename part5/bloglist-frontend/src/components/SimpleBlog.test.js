import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders the title', () => {
  const simpleBlog = {
    title: 'Mount Everest King of the Mountains',
    author: 'Shiva Shankar',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={simpleBlog} />
  )

  //component.debug()
  expect(component.container).toHaveTextContent(
    'Mount Everest King of the Mountains'
  )

  expect(component.container).toHaveTextContent(
    'Shiva Shankar'
  )
  const div = component.container.querySelector('.likes')
  expect(div).toHaveTextContent(
    'blog has 3 likes'
  )

})

test('pressing like button twice, event handler function in component props called twice ', () => {
  const simpleBlog = {
    title: 'Mount Everest King of the Mountains',
    author: 'Shiva Shankar',
    likes: 3
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})





