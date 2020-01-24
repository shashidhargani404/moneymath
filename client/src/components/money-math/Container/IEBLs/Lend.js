import React from 'react'
import { connect } from 'react-redux'
import StatementsListing from './StatementsListing'

function Lend(props) {
    return (
        <StatementsListing statements={props.lends} type="lend" />
    )
}

const mapStateToProps = state => {
    return {
        lends: state.lends
    }
}

export default connect(mapStateToProps)(Lend)