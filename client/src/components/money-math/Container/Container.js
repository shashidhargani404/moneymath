import React from 'react'
import './Container.css'
import NavTab from './NavTab/NavTab'
import IEBLs from './IEBLs/IEBLs'

function Container(props) {
    return (
        <div id="Container-main-div">
            <NavTab />
            <IEBLs />
        </div>
    )
}

export default Container