import React from 'react'
import { connect } from 'react-redux'
import StatementsListing from './StatementsListing'

function Income(props) {
    return (
        <StatementsListing statements={props.incomes} type="income" />
    )
}

const mapStateToProps = state => {
    return {
        incomes: state.incomes
    }
}

export default connect(mapStateToProps)(Income)