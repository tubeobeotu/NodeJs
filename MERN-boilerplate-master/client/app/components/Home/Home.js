import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('mounted!');
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: ''
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this)
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this)

    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this)
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this)
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this)
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this)

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

  }

  componentDidMount() {
    const token = getFromStorage('the_main_app')
    if(token){
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log('1231212331');
          if(json.sucess){
            this.setState({
              token,
              isLoading: false
            });
          }else{
            this.setState({
              isLoading: false
            });
          }

        });
    }else{
      this.setState({
          isLoading: false
      });
    }
  }


  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError
    } = this.state;

    if(isLoading){
      return (<div><p>Loading...</p></div>);
    }
    if(!token){
      return (
          <div>
            <div>
              {
                (signInError) ? (<p>{signInError}</p>) : (null)
              }
              <p>Sign In</p>
              <input type='email' placeholder='Email' value={signInEmail} onChange={this.onTextboxChangeSignInEmail} /><br />
              <input type='password' placeholder='Password' value={signInPassword} onChange={this.onTextboxChangeSignInPassword} /><br />
              <button onClick={this.onSignIn}>Sign In</button>
            </div>
            <div>
              {
                (signUpError) ? (<p>{signInError}</p>) : (null)
              }
              <p>Sign Up</p>
              <input type='text' placeholder='FirstName' value={signUpFirstName} onChange={this.onTextboxChangeSignUpFirstName} /><br />
              <input type='text' placeholder='LastName' value={signUpLastName} onChange={this.onTextboxChangeSignUpLastName} /><br />
              <input type='email' placeholder='Email' value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} /><br />
              <input type='password' placeholder='Password' value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} /><br />
              <button onClick={this.onSignUp}>Sign Up</button>
            </div>

          </div>
      );
    }
    return (
        <div>
          <p>Sign In</p>
        </div>
    );
  }

  onSignUp(){
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true
    });

    fetch('/api/account/signup', {  method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({
                                firstName: signUpFirstName,
                                lastName: signUpLastName,
                                email: signUpEmail,
                                password: signUpPassword
                              }), })
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        if(json.sucess){
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: ''
          });
        }else {

        }
      });
  }

  onSignIn(){

  }


  onTextboxChangeSignInEmail(event){
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName: event.target.value
    });
  }
  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName: event.target.value
    });
  }
  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value
    });
  }
  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value
    });
  }
}

export default Home;
