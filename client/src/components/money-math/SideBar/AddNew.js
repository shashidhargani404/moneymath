import React from 'react'
import AddNewForm from './AddNewForm'

function AddNew(props) {
    const handleAddForm = (ele, display) => {
        document.getElementById(ele).style.display = display
    }
    
    return (
        <div>
            <button id="SB-add-new-btn" onClick={() => handleAddForm('SB-add-new-form', 'block')}>add new <span>$</span></button>
            <AddNewForm handleAddForm={handleAddForm} />
        </div>
    )
}

export default AddNew