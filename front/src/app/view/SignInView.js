import React, {Component} from 'react';
import "../../App.css"

class SignInView extends Component
{
  render() {
    return (
      <div>
        <div style={{'background-color': '#9370DB', 'text-align': 'center', padding: "10px"}}>
          <label style={{color: 'white', 'font-size': 40}}>Dashboard Epitech</label>
        </div>
        <div style={{'text-align': 'center'}}>
          <h1> Connect with Microsoft </h1>
          <button id='OauthButton' onClick={this.props.onSignIn}>Sign In</button>
        </div>
      </div>
    );
  }
}

export default SignInView;
