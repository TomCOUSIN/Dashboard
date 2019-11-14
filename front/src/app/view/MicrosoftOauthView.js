import React from "react";
import PropTypes from 'prop-types';
import AuthProvider from "../services/Microsoft/MicrosoftOauthProvider";
import UserView from "./UserView";

const Json = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

class MicrosoftOauthView extends React.Component {
  static propTypes = {
    account: PropTypes.object,
    emailMessages: PropTypes.object,
    error: PropTypes.string,
    graphProfile: PropTypes.object,
    onSignIn: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    onRequestEmailToken: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <section>
          {!this.props.account ? (
            <>
              <h1> Connect with Microsoft </h1>
              <button onClick={this.props.onSignIn}>Sign In</button>
            </>
          ) : (
            <>
              <button onClick={this.props.onSignOut}>Sign Out</button>
              <UserView username={this.props.account.name}/>
            </>
          )}
          {this.props.error && (
            <p className="error">Error: {this.props.error}</p>
          )}
        </section>
      </div>
    );
  }
}

export default AuthProvider(MicrosoftOauthView);
