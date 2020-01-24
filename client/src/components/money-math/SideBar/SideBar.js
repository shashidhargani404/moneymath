import React from 'react'
import './SideBar.css'
import AddNew from './AddNew'
import TotalMoney from './TotalMoney'

function SideBar(props) {
    return (
        <div id="SB-main-div">
            <AddNew />
            <TotalMoney />
        </div>
    )
}

export default SideBar