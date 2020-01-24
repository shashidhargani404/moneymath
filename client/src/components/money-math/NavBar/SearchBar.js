import React from 'react'
import { MdSearch } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault()
    }
    handleChange = e => {
        this.setState({
            search: e.target.value
        })
    }
    handleFocus = () => {
        document.getElementById('NB-search-bar').style.cssText = 'background-color:rgb(263, 263, 263); box-shadow: 2px 2px 10px 5px black;'
        document.getElementById('NB-button-one').style.cssText = 'color:black'
    }
    handleBlur = () => {
        document.getElementById('NB-search-bar').style.cssText = 'background-color:rgba(255, 255, 255, 0.301); box-shadow:none'
        document.getElementById('NB-button-one').style.cssText = 'color:rgb(243, 243, 243)'
    }
    handleClick = () => {
        this.setState({
            search: ''
        })
    }
    render() {
        const opacity = this.state.search ? 1 : 0
        return (
            <form id="NB-search-bar" onSubmit={this.handleSubmit}>
                <button id="NB-button-one"><MdSearch /></button>
                <input placeholder="Search statement" value={this.state.search} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                <button id="NB-button" style={{opacity, color: 'black'}} onClick={this.handleClick}><TiDelete /></button>
            </form>
        )
    }
}

export default SearchBar