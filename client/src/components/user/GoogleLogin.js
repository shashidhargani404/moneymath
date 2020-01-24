import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { AiOutlineGoogle } from 'react-icons/ai'

export default function Google(){

    const responseGoogle = response => {
        // console.log(response)
    }

    return (
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            render={renderProps => (
                <button id="signup-google" onClick={renderProps.onClick} disabled={renderProps.disabled}><AiOutlineGoogle id="google-icon" /><span>Log in with Google</span></button>
              )}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}