import axios from '../config/axios'

export const setIncomes = incomes => {
    return {
        type: 'SET_INCOMES',
        payload: incomes
    }
}

export const startSetIncomes = () => {
    return (dispatch) => {
        axios.get('/incomes')
            .then((response) => {
                const incomes = response.data
                if(Array.isArray(incomes)) {
                    dispatch(setIncomes(incomes))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addIncome = income => {
    return {
        type: 'ADD_INCOME',
        payload: income
    }
}

export const startAddIncome = (formData) => {
    return (dispatch) => {
        axios.post('/incomes', formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(addIncome(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const editIncome = income => {
    return {
        type: 'EDIT_INCOME',
        payload: income
    }
}

export const startEditIncome = ( id, formData ) => {
    return (dispatch) => {
        axios.put(`/incomes/${id}`, formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(editIncome(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startTrashAndStarIncomes = (formData) => {
    return (dispatch) => {
        axios.put('/incomes', formData)
            .then((response) => {
                const incomes = response.data
                if(Array.isArray(incomes)) {
                    dispatch(setIncomes(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startDeleteTrashIncomes = (formData) => {
    return (dispatch) => {
        axios.put('/incomes_delete', formData)
            .then((response) => {
                const incomes = response.data
                if(Array.isArray(incomes)) {
                    dispatch(setIncomes(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}