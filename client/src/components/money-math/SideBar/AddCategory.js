import React from 'react';
import { connect } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import { startAddCategory } from '../../../actions/categoryAction'

class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
    }
    handleChange = e => {
        this.setState({
            name: e.target.value
        })
    }
    handleSubmit = () => {
        const formData = {
            name: this.state.name,
            type: this.props.type
        }
        this.props.dispatch(startAddCategory(formData))
        this.props.handleAddForm('AC-form', 'none')
        this.setState({ name: ''})
    }
    render() {
        return (
            <div id="AC-form" >
                <input placeholder="Enter new category" value={ this.state.name } onChange={ this.handleChange } />
                <button type="button" onClick={ this.handleSubmit } ><FaCheck /></button>
            </div>
        )
    }
}

export default connect()(AddCategory)