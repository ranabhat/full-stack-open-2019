import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
   // console.log('filter props',props.store.getState())   
    const handleChange = (event) => {
        // input field value is in variable event.target.value
        event.preventDefault()
       //console.log('event', event.target.value)
       const filterValue = event.target.value
       //console.log('event', filterValue)
       props.store.dispatch(filterChange(filterValue))
    }
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter