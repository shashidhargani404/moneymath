const borrowsInitialState = []

const borrowReducer = (state = borrowsInitialState, action) => {
    switch(action.type) {
        case 'SET_BORROWS': {
            return action.payload
        }
        case 'ADD_BORROW': {
            return [...state, action.payload]
        }
        case 'EDIT_BORROW': {
            return state.map( borrow => borrow._id === action.payload._id ? action.payload : borrow )
        }
        default: {
            return [...state]
        }
    }
}

export default borrowReducer