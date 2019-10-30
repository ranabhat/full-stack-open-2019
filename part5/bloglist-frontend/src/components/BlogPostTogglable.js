import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogPostTogglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  // console.log(props.children.props.children[0])

  return (
    <>
      <div style={hideWhenVisible} className={'hideBlogDetail'}>
        <p onClick={toggleVisibility}>{props.titleLabel} {props.authorLabel}</p>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <p onClick={toggleVisibility} className='paraPressed'>{props.titleLabel} {props.authorLabel}</p>
        {props.children}
        {/* <p onClick={toggleVisibility}>{props.titleLabel} {props.authorLabel}</p> */}
      </div>
    </>
  )
}

BlogPostTogglable.propTypes = {
  titleLabel: PropTypes.string.isRequired,
  authorLabel: PropTypes.string.isRequired
}


export default BlogPostTogglable