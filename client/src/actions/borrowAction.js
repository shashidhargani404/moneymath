import axios from '../config/axios'

export const setBorrows = borrows => {
    return {
        type: 'SET_BORROWS',
        payload: borrows
    }
}

export const startSetBorrows = () => {
    return (dispatch) => {
        axios.get('/borrows')
            .then((response) => {
                const borrows = response.data
                if(Array.isArray(borrows)) {
                    dispatch(setBorrows(borrows))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addBorrow = borrow => {
    return {
        type: 'ADD_BORROW',
        payload: borrow
    }
}

export const startAddBorrow = (formData) => {
    return (dispatch) => {
        axios.post('/borrows', formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(addBorrow(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const editBorrow = borrow => {
    return {
        type: 'EDIT_BORROW',
        payload: borrow
    }
}

export const startEditBorrow = ( id, formData ) => {
    return (dispatch) => {
        axios.put(`/borrows/${id}`, formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(editBorrow(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startTrashAndStarBorrows = (formData) => {
    return (dispatch) => {
        axios.put('/borrows', formData)
            .then((response) => {
                const borrows = response.data
                if(Array.isArray(borrows)) {
                    dispatch(setBorrows(borrows))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startDeleteTrashBorrows = (formData) => {
    return (dispatch) => {
        axios.put('/borrows_delete', formData)
            .then((response) => {
                const borrows = response.data
                if(Array.isArray(borrows)) {
                    dispatch(setBorrows(borrows))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}