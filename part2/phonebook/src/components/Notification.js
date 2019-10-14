import React from 'react'

const Notification = ({ message, colorErrorMessage }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={colorErrorMessage}>
        {message}
      </div>
  
    )
  }

export default Notification