import React from 'react'
import { connect } from 'react-redux'

function UserProfile(props) {
    return (
        <div id="NB-user-profile">
            <span>{ props.user ? ( props.user.username ? props.user.username[0].toUpperCase() : '' ) : '' }</span>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserProfile)