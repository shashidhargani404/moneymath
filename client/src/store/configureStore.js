import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'
import incomeReducer from '../reducers/incomeReducer'
import expenseReducer from '../reducers/expenseReducer'
import borrowReducer from '../reducers/borrowReducer'
import lendReducer from '../reducers/lendReducer'
import categoryReducer from '../reducers/categoryReducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        incomes: incomeReducer,
        expenses: expenseReducer,
        borrows: borrowReducer,
        lends: lendReducer,
        categories: categoryReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore