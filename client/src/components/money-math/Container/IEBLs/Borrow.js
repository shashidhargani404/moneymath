import React from 'react'
import { connect } from 'react-redux'
import StatementsListing from './StatementsListing'

function Borrow(props) {
    return (
        <StatementsListing statements={props.borrows} type="borrow" />
    )
}

const mapStateToProps = state => {
    return {
        borrows: state.borrows
    }
}

export default connect(mapStateToProps)(Borrow)