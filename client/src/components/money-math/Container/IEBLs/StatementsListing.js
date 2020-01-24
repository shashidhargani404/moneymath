import React from 'react'
import { connect } from 'react-redux'
import { MdStarBorder, MdCheckBoxOutlineBlank, MdCheckBox, MdEdit, MdDelete, MdRestore } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { IoIosCheckmarkCircle, IoIosSave, IoMdStar, IoIosCloseCircle } from 'react-icons/io'
import { startEditIncome, startTrashAndStarIncomes, startDeleteTrashIncomes } from '../../../../actions/incomeAction'
import { startEditExpense, startTrashAndStarExpenses, startDeleteTrashExpenses } from '../../../../actions/expenseAction'
import { startEditBorrow, startTrashAndStarBorrows, startDeleteTrashBorrows } from '../../../../actions/borrowAction'
import { startEditLend, startTrashAndStarLends, startDeleteTrashLends } from '../../../../actions/lendAction'


class StatementsListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isTrashList: false,
            isStarList: false,
            statements: props.statements,
            filterCategory: '',
            editId: '',
            amount: '',
            category: '',
            description: '',
            selects: []
        }
    }
    handleClick = (editId, amount, category, description) => {
        this.setState({editId, amount, category, description})
    }
    handleAllSelects = () => {
        this.setState({
            selects: this.state.selects.length === this.state.statements.length ? [] : this.state.statements.map(statement => statement._id)
        })
    }
    handleSelects = id => {
        this.setState((prevState) => {
            return {
                selects: prevState.selects.includes(id) ? prevState.selects.filter(select => select !== id) : [...prevState.selects, id]
            }
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFilterCategory = e => {
        const { value } = e.target
        this.setState(() => ({
            filterCategory: value,
            statements: value ? this.props.statements.filter(statement => statement.category._id === value) : this.props.statements,
            selects: []
        }))
    }
    handleSubmit = () => {
        const { editId, amount, category, description } = this.state
        const formData = { amount, category, description }
        switch(this.props.type) {
            case 'income': {
                this.props.dispatch(startEditIncome(editId, formData))
                break;
            }
            case 'expense': {
                this.props.dispatch(startEditExpense(editId, formData))
                break;
            }
            case 'borrow': {
                this.props.dispatch(startEditBorrow(editId, formData))
                break;
            }
            case 'lend': {
                this.props.dispatch(startEditLend(editId, formData))
                break;
            }
        }
        this.setState({ editId: '', amount: '', category: '', description: ''})
    }
    handleTrashAndFav = (propType, value, id) => {
        const selects = id ? [id] : this.state.selects
        switch(this.props.type) {
            case 'income': {
                this.props.dispatch(startTrashAndStarIncomes({ selects, propType, value }))
                break;
            }
            case 'expense': {
                this.props.dispatch(startTrashAndStarExpenses({ selects, propType, value }))
                break;
            }
            case 'borrow': {
                this.props.dispatch(startTrashAndStarBorrows({ selects, propType, value }))
                break;
            }
            case 'lend': {
                this.props.dispatch(startTrashAndStarLends({ selects, propType, value }))
                break;
            }
        }
    }

    handleDeleteTrash = (id) => {
        const selects = id ? [id] : this.state.selects
        switch(this.props.type) {
            case 'income': {
                this.props.dispatch(startDeleteTrashIncomes({selects}))
                break;
            }
            case 'expense': {
                this.props.dispatch(startDeleteTrashExpenses({selects}))
                break;
            }
            case 'borrow': {
                this.props.dispatch(startDeleteTrashBorrows({selects}))
                break;
            }
            case 'lend': {
                this.props.dispatch(startDeleteTrashLends({selects}))
                break;
            }
        }
    }

    handleTrashAndStarList = (propType, value) => {
        this.setState({ [propType]: value, selects: [] })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ statements: nextProps.statements })
    }
    render() {
        const { isTrashList, isStarList, statements, selects, filterCategory, editId, amount, category, description } = this.state
        return (
            statements.length ? (
                <div id={this.props.type} >
                    <div id="statement-top-div">
                        <button onClick={this.handleAllSelects} > { statements.length === selects.length ? <MdCheckBox style={{color: 'black'}} /> : <MdCheckBoxOutlineBlank /> }</button>
                        
                        { isTrashList ? (
                            <button onClick={ () => this.handleDeleteTrash() } ><MdDelete /></button>
                        ) : (
                            <button onClick={ () => this.handleTrashAndFav('isTrashed', true ) } ><MdDelete /></button>
                        )}
                        <select value={filterCategory} onChange={ this.handleFilterCategory } >
                            <option value="" >All</option>
                            {
                                this.props.categories.filter(category => category.type === this.props.type).map(category => {
                                    return <option key={category._id} value={category._id} >{ category.name }</option>
                                })
                            }
                        </select>

                        <button onClick={ () => this.handleTrashAndStarList('isStarList', !isStarList) } >{ isStarList ? <IoMdStar style={{ color: 'gold'}} /> : <MdStarBorder /> } </button>
                        <button onClick={ () => this.handleTrashAndStarList('isTrashList', !isTrashList)} >{ isTrashList ? <MdDelete style={{color: 'red'}} /> : <MdDelete /> }</button>
                    </div>
                    <ul>
                    {
                        statements.filter(statement => statement.isTrashed === isTrashList && (isStarList ? statement.isStarred : true)).map(statement => {
                            const bgColor = statement.isPending ? { backgroundColor: '#c2dbff' } : {}
                            return (
                                <li style={bgColor} id="statement" key={statement._id}>
                                    <button className="statement-icons" onClick={ () => this.handleSelects(statement._id) } >{ selects.includes(statement._id) ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }</button>
                                    <button className="statement-icons" onClick={ () => this.handleTrashAndFav( 'isStarred', !statement.isStarred, statement._id )}  >{ statement.isStarred ? <IoMdStar style={{ color: 'gold'}} /> : <MdStarBorder /> }</button>
                                    { editId === statement._id ? <input className="statement-amount-input" autoComplete="off" name="amount" value={amount} onChange={this.handleChange} /> : <p id="statement-amount">$ {statement.amount}</p> }
                                    <div id="statement-dscp-date">
                                        <div id="statement-catg-dscp">
                                            { editId === statement._id ? (
                                                <select className="statement-catg-select" name="category" value={category} onChange={this.handleChange}>
                                                    {
                                                        this.props.categories.filter(category => category.type === (this.props.type).toLowerCase()).map(category => {
                                                            return <option name="category" value={category._id} key={category._id} >{ category.name }</option>
                                                        })
                                                    }
                                                </select>
                                            ) : <p id="statement-catg">{statement.category.name}</p> }
                                            { editId === statement._id ? <textarea className="statement-dscp-textarea" name="description" value={description} onChange={this.handleChange} ></textarea> : <p id="statement-dscp">{statement.description}</p> }
                                        </div>
                                        <div style={{display: 'flex', height: 'fit-content'}}>
                                            <p id="statement-date">{statement.createdAt.slice(0,10)}</p>
                                            <button className="statement-button statement-icons" ><FaEye /></button>
                                            { isTrashList ? (
                                                <button className="statement-button statement-icons" onClick={ () => this.handleDeleteTrash(statement._id) } ><MdDelete /></button>
                                            ) : (
                                                editId === statement._id ? <button className="statement-button statement-icons" onClick={ this.handleSubmit } ><IoIosSave /></button> : <button className="statement-button statement-icons" onClick={() => { this.handleClick(statement._id, statement.amount, statement.category._id, statement.description)}} ><MdEdit /></button>
                                            ) }
                                                <button className="statement-button statement-icons" onClick={ () => this.handleTrashAndFav('isTrashed', !isTrashList, statement._id)} >{ isTrashList ? <MdRestore /> : <MdDelete /> }</button>
                                            {this.props.type === 'borrow' || this.props.type === 'lend' ? <button className="statement-button statement-icons" onClick={ () => this.handleTrashAndFav('isPending', !statement.isPending, statement._id)} >{ statement.isPending ? <IoIosCheckmarkCircle /> : <IoIosCloseCircle /> }</button> : '' }
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            ) : <p id={this.props.type} className="no-statement">No statements are available. Add one to See.</p>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(StatementsListing)