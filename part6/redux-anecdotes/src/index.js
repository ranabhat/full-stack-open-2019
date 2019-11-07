import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux' // in order to use connect function
import App from './App'
import store from './store'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   notify: notificationReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)
//console.log('index.js store',store.getState())

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