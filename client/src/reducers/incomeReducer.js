const incomeInitialState = []

const incomeReducer = (state = incomeInitialState, action) => {
    switch(action.type) {
        case 'SET_INCOMES': {
            return action.payload
        }
        case 'ADD_INCOME': {
            return [...state, action.payload]
        }
        case 'EDIT_INCOME': {
            return state.map(income => {
                return income._id === action.payload._id ? action.payload : income
            })
        }
        default: {
            return [...state]
        }
    }
}

export default incomeReducer