import React from 'react'

import { GoogleLogin } from 'react-google-login';

 

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    goSignUp = () => {
        this.props.history.push('/signup')
    }
    googleLogin = (response) => {
        console.log(response.accessToken);
        console.log(response.profileObj);
        console.log(response.googleId);

        if(response.accessToken){
            // -- todo this should be '/home'
            this.props.history.push('/home')
        }
    }
    googleSignup = (response) => {
        console.log(response.accessToken);
        console.log(response.profileObj);
        console.log(response.googleId);

        if(response.accessToken){
            this.props.history.push('/tasks')
        }
    }
    render(){
        return(
            <div>
                <h1>Welcome</h1>

                <GoogleLogin
                    clientId="711034564158-vdgd416ph49b6n8lpbvb32gatufenisc.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.googleLogin}
                    onFailure={this.googleLogin}
                />
                <br/>
                <br/>
                <GoogleLogin
                    clientId="711034564158-vdgd416ph49b6n8lpbvb32gatufenisc.apps.googleusercontent.com"
                    buttonText="SignUp"
                    onSuccess={this.googleSignup}
                    onFailure={this.googleSignup}
                />
            </div>
        )
    }
}