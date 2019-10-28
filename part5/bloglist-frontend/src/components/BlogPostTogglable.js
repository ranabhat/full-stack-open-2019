import React, { useState } from 'react'

const BlogPostTogglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
   // console.log(props.children.props.children[0])

    return (
        <div>
            <div style={hideWhenVisible}>
                <p onClick={toggleVisibility}>{props.titleLabel} {props.authorLabel}</p>
            </div>
            <div  style={showWhenVisible}>
            <p onClick={toggleVisibility}>{props.titleLabel} {props.authorLabel}</p>
            {props.children}
                {/* <p onClick={toggleVisibility}>{props.titleLabel} {props.authorLabel}</p> */}
            </div>
        </div>
    )
}

export default BlogPostTogglable