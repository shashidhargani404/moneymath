import React from 'react'
import { connect } from 'react-redux'
import Card from './Card'

function TotalMoney(props) {
    const totalIncome = props.incomes.reduce((total, income) => total + income.amount, 0)
    const totalExpense = props.expenses.reduce((total, expense) => total + expense.amount, 0)
    const totalBorrow = props.borrows.filter(borrow => borrow.isPending).reduce((total, borrow) => total + borrow.amount, 0)
    const totalLend = props.lends.filter(lend => lend.isPending).reduce((total, lend) => total + lend.amount, 0)
    
    return (
        <>
            <Card total={ totalIncome - totalExpense } title="Total Saving" body="This is all you save till now." />
            <Card total={ totalIncome - totalExpense + totalBorrow - totalLend } title="Cash on Hand" body="Total money you have with you." />
            <Card total={ totalBorrow } title="Borrowed Money" body="This is what you have to give back." />
            <Card total={ totalLend } title="Lended Money" body="This is what you have to take back." />
        </>
    )
}

const mapStateToProps = state => {
    return {
        incomes: state.incomes.filter(income => !income.isTrashed),
        expenses: state.expenses.filter(expense => !expense.isTrashed),
        borrows: state.borrows.filter(borrow => !borrow.isTrashed),
        lends: state.lends.filter(lend => !lend.isTrashed)
    }
}

export default connect(mapStateToProps)(TotalMoney)