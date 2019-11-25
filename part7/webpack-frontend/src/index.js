import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // in order to use connect function
import store from './store'

import App from './App'

// import './index.css'

// Provider component provided by React Redux library that must receive  Redux store
const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App  />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)