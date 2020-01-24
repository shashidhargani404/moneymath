const expenseInitialState = []

const expenseReducer = (state = expenseInitialState, action) => {
    switch(action.type) {
        case 'SET_EXPENSES': {
            return action.payload
        }
        case 'ADD_EXPENSE': {
            return [...state, action.payload]
        }
        case 'EDIT_EXPENSE': {
            return state.map(expense => {
                return expense._id === action.payload._id ? action.payload : expense
            })
        }
        default: {
            return [...state]
        }
    }
}

export default expenseReducer