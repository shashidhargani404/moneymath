const lendInitialState = []

const lendReducer = (state = lendInitialState, action) => {
    switch(action.type) {
        case 'SET_LENDS': {
            return action.payload
        }
        case 'ADD_LEND': {
            return [...state, action.payload]
        }
        case 'EDIT_LEND': {
            return state.map(lend => lend._id === action.payload._id ? action.payload : lend )
        }
        default: {
            return [...state]
        }
    }
}

export default lendReducer