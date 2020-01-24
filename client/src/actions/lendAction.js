import axios from '../config/axios'

export const setLends = lends => {
    return {
        type: 'SET_LENDS',
        payload: lends
    }
}

export const startSetLends = () => {
    return (dispatch) => {
        axios.get('/lends')
            .then((response) => {
                const lends = response.data
                if(Array.isArray(lends)) {
                    dispatch(setLends(lends))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const addLend = lend => {
    return {
        type: 'ADD_LEND',
        payload: lend
    }
}

export const startAddLend = formData => {
    return (dispatch) => {
        axios.post('/lends', formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(addLend(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const editLend = lend => {
    return {
        type: 'EDIT_LEND',
        payload: lend
    }
}

export const startEditLend = ( id, formData ) => {
    return (dispatch) => {
        axios.put(`/lends/${id}`, formData)
            .then((response) => {
                if(typeof response.data === 'object') {
                    dispatch(editLend(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startTrashAndStarLends = (formData) => {
    return (dispatch) => {
        axios.put('/lends', formData)
            .then((response) => {
                const lends = response.data
                if(Array.isArray(lends)) {
                    dispatch(setLends(lends))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startDeleteTrashLends = (formData) => {
    return (dispatch) => {
        axios.put('/lends_delete', formData)
            .then((response) => {
                const lends = response.data
                if(Array.isArray(lends)) {
                    dispatch(setLends(lends))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}