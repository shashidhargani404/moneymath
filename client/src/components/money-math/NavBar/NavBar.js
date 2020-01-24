import React from 'react'
import './NavBar.css'
import { AiOutlineCalculator } from 'react-icons/ai'
import SearchBar from './SearchBar'
import UserProfile from './UserProfile'

function NavBar(props) {
    return (
        <div id="NB-container">
            <div id="NB-icon">
                <AiOutlineCalculator id="NB-cal-icon" />
                <span>MoneyMath</span>
            </div>
            <div  id="NB-sb-up">    
                <SearchBar />
                <UserProfile />
            </div>
        </div>
    )
}

export default NavBar