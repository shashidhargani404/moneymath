import axios from '../config/axios'
import {startSetIncomes} from './incomeAction'
import { startSetExpenses } from './expenseAction'
import { startSetBorrows } from './borrowAction'
import { startSetLends } from './lendAction'
import { startSetCategories } from './categoryAction'

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const startSetUser = () => {
    return (dispatch) => {
        axios.get('/user')
            .then((response) => {
                const user = response.data
                if(user.username && user.email) {
                    dispatch(setUser(user))
                    dispatch(startSetIncomes())
                    dispatch(startSetExpenses())
                    dispatch(startSetBorrows())
                    dispatch(startSetLends())
                    dispatch(startSetCategories())
                } else {
                    localStorage.removeItem('x-auth-moneymath')
                    window.location.href = '/'
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}