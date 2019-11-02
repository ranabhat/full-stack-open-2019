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
        <span onClick={toggleVisibility}>{props.titleLabel}</span><span> {props.authorLabel}</span>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <span onClick={toggleVisibility} className='spanTitlePress'>{props.titleLabel}</span> <span>{props.authorLabel}</span>
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