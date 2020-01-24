import React from 'react'
import Google from './GoogleLogin'
import { Link } from 'react-router-dom'
import { setUser } from '../../actions/userAction'
import axios from '../../config/axios'
import { connect } from 'react-redux'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailError: '',
            username: '',
            usernameError: '',
            fullName: '',
            password: '',
            passwordError: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault()
        const { email, username, password } = this.state
        const emailValidater = /\S+@\S+\.\S+/
        if(!emailValidater.test(email) && !username && !password) {
            this.setState({ 
                emailError: '* Invalid Email.',
                usernameError: '* Username requires 5 chars min.',
                passwordError: '* Password requires 8 chars min.'
            })
        } else if(!emailValidater.test(email)) {
            this.setState({ emailError: '* Invalid Email.' })
        } else if(!username) {
            this.setState({ usernameError: '* Username requires 5 chars min.' })
        } else if(!password) {
            this.setState({ passwordError: '* Password requires 8 chars min.' })
        } else {
            const formData = { email, username, password }

            axios.post('/register', formData)
                .then((response) => {
                    if(response.data.errmsg) {
                        this.setState({ emailError: '* Email already exist. Please login'})
                    } else if (!response.data.errors) {
                        const { user, token } = response.data
                        localStorage.setItem('x-auth-moneymath', token)
                        this.props.dispatch(setUser(user))
                        this.props.history.push('/')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { emailError, usernameError, passwordError } = this.state
        return (
            <div id="signup-page">
                <div id="signup-main-div">
                    <h1 id="signup-header">moneyMath</h1>
                    <p id="signup-first-p" >Sign up to do some Math on Money for better finance.</p>
                    <Google />
                    <div id="signup-form-separater">
                        <hr/>
                        <p>OR</p>
                        <hr/>
                    </div>
                    <div id="signup-form">
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="Email" name="email" value={this.state.mobile} onChange={this.handleChange} />
                            { this.state.emailError ? <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1px', textAlign: 'left', width: '260px' }} > { emailError } </p> : '' }
                            <input placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                            { this.state.usernameError ? <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1px', textAlign: 'left', width: '260px' }} > { usernameError } </p> : '' }
                            <input disabled style={{backgroundColor: 'gray'}} placeholder="Full Name" name="fullName" value={this.state.fullName} onChange={this.handleChange} />
                            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                            { this.state.passwordError ? <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1px', textAlign: 'left', width: '260px' }} > { passwordError } </p> : '' }
                            <button id="signup-submit-button" type="submit" >Sign Up</button>
                        </form>
                    </div>
                    <p id="signup-second-p">By signing up, you agree to our <b>Terms</b>, <b>Data Policy</b> and <b>Cookies Policy</b>.</p>
                    <p id="signup-third-p">Have an account ? <Link to="/" style={{textDecoration: 'none'}} >Log In</Link></p>
                </div>
            </div>
        )
    }
}

export default connect()(Signup)