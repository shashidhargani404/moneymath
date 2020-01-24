import axios from '../config/axios'

export const setExpenses = expenses => {
    return {
        type: 'SET_EXPENSES',
        payload: expenses
    }
}

export const startSetExpenses = () => {
    return (dispatch) => {
        axios.get('/expenses')
            .then((response) => {
                const expenses = response.data
                if(Array.isArray(expenses)) {
                    dispatch(setExpenses(expenses))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addExpense = expense => {
    return {
        type: 'ADD_EXPENSE',
        payload: expense
    }
}

export const startAddExpense = formData => {
    return (dispatch) => {
        axios.post('/expenses', formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(addExpense(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const editExpense = expense => {
    return {
        type: 'EDIT_EXPENSE',
        payload: expense
    }
}

export const startEditExpense = ( id, formData ) => {
    return (dispatch) => {
        axios.put(`/expenses/${id}`, formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(editExpense(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startTrashAndStarExpenses = (formData) => {
    return (dispatch) => {
        axios.put('/expenses', formData)
            .then((response) => {
                const expenses = response.data
                if(Array.isArray(expenses)) {
                    dispatch(setExpenses(expenses))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startDeleteTrashExpenses = (formData) => {
    return (dispatch) => {
        axios.put('/expenses_delete', formData)
            .then((response) => {
                const expenses = response.data
                if(Array.isArray(expenses)) {
                    dispatch(setExpenses(expenses))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}