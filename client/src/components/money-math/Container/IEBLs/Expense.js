import React from 'react'
import { connect } from 'react-redux'
import StatementsListing from './StatementsListing'

function Expense(props) {
    return (
        <StatementsListing statements={props.expenses} type="expense" />
    )
}

const mapStateToProps = state => {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps)(Expense)