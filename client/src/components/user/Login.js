import React from 'react'
import Google from './GoogleLogin'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../../actions/userAction'
import { startSetIncomes } from '../../actions/incomeAction'
import { startSetExpenses } from '../../actions/expenseAction'
import { startSetBorrows } from '../../actions/borrowAction'
import { startSetLends } from '../../actions/lendAction'
import { startSetCategories } from '../../actions/categoryAction'
import axios from '../../config/axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault()

        const { email, password } = this.state
        const formData = { email, password }

        axios.post('/login', formData)
            .then((response) => {
                if(response.data.passwordError) {
                    this.setState({ error: response.data.passwordError })
                } else if(response.data.token) {
                    const { token, user } = response.data
                    localStorage.setItem('x-auth-moneymath', token)
                    this.props.dispatch(setUser(user))
                    this.props.dispatch(startSetIncomes())
                    this.props.dispatch(startSetExpenses())
                    this.props.dispatch(startSetBorrows())
                    this.props.dispatch(startSetLends())
                    this.props.dispatch(startSetCategories())
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { email, password, error } = this.state
        return (
            <div id="signup-main-div" style={{paddingBottom: '25px', marginBottom: '150px'}}>
                <h1 id="signup-header">moneyMath</h1>
                <div id="signup-form">
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <button disabled={ !email && password.length < 8 } id="signup-submit-button" type="submit" >Log In</button>
                    </form>
                </div>
                { error ? <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1px', width: '260px', lineHeight: '20px', marginBottom: '10px' }} >{ error }</p> : '' }
                <Link id="signup-third-p" style={{margin: '5px 0 10px', textDecoration: 'none'}} to="/">Forgot password?</Link>
                <p id="signup-third-p">Don't have an account? <Link to="/signup" style={{textDecoration: 'none'}} >Sign up</Link></p>
                <div id="signup-form-separater" style={{margin: '0px 0 20px'}}>
                    <hr/>
                    <p>OR</p>
                    <hr/>
                </div>
                <Google />
            </div>
        )
    }
}

export default connect()(Login)