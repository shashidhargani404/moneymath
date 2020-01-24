import React from 'react'
import './MoneyMath.css'
import NavBar from './NavBar/NavBar'
import SideBar from './SideBar/SideBar'
import Container from './Container/Container'

function MoneyMath(props) {
    return (
        <div id="MM-main-div">
            <NavBar />
            <div id="SideBar-Container-mian-div">
                <SideBar />
                <Container />
            </div>
        </div>
    )
}

export default MoneyMath