import axios from '../config/axios'

export const setCategories = categories => {
    return {
        type: 'SET_CATEGORIES',
        payload: categories
    }
}

export const startSetCategories = () => {
    return (dispatch) => {
        axios.get('/categories')
            .then((response) => {
                const categories = response.data
                if(Array.isArray(categories)) {
                    dispatch(setCategories(categories))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const addCategory = category => {
    return {
        type: 'ADD_CATEGORY',
        payload: category
    }
}

export const startAddCategory = formData => {
    return (dispatch) => {
        axios.post('/categories', formData)
            .then((response) => {
                console.log(response)
                if(typeof response.data === 'object') {
                    dispatch(addCategory(response.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}