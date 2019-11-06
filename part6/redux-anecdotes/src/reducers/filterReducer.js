const filterReducer = (state= '', action) => {
  //  console.log('filter state', state)
  //  console.log('filter action', action)
    switch (action.type) {
        case 'FILTER':
            return action.filter
        default: 
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'FILTER',
        filter
       
    }
}

export default filterReducer