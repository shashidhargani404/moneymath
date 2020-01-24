import Axios from 'axios'

const axios = Axios.create({
    baseURL: '/',
    headers: {
        'x-auth': localStorage.getItem('x-auth-moneymath')
    }
})

export default axios