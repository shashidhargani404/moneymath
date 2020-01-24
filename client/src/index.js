import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './store/configureStore'
import { startSetUser } from './actions/userAction'

const store = configureStore()

localStorage.getItem('x-auth-moneymath') && (
    store.dispatch(startSetUser())
)

const element = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(element, document.getElementById('root'));