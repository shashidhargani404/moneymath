import React from 'react'
import './NavTab.css'

function NavTab(props) {

    const handleClick = ( btn, color ) => {
        const buttons = ['income', 'expense', 'borrow', 'lend']

        for(const button of buttons) {
            document.getElementById(button).style.display = 'none'
            document.getElementById('NT-' + button).style.borderBottom = '4px solid rgba(255, 255, 255, 0)'
        }
        document.getElementById(btn).style.display = 'block'
        document.getElementById('NT-' + btn).style.borderBottom = '4px solid ' + color
    }

    return (
        <div id="NT-main-div">
            <button id="NT-income" onClick={() => {
                handleClick('income', 'green')
            }} >Income</button>
            <button id="NT-expense" onClick={() => {
                handleClick('expense', 'red')
            }} >Expense</button>
            <button id="NT-borrow" onClick={() => {
                handleClick('borrow', 'black')
            }} >Borrow</button>
            <button id="NT-lend" onClick={() => {
                handleClick('lend', 'orange')
            }} >Lend</button>
        </div>
    )
}

export default NavTab 