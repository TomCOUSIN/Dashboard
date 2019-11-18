import React from "react";
import PropTypes from 'prop-types';
import AuthProvider from "../services/Microsoft/MicrosoftOauthProvider";
import UserView from "./UserView";
import SignInView from "./SignInView";

const Json = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

class MicrosoftOauthView extends React.Component {
  static propTypes = {
    account: PropTypes.object,
    error: PropTypes.string,
    graphProfile: PropTypes.object,
    onSignIn: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <section>
          {!this.props.account ? (
            <>
              <SignInView onSignIn={this.props.onSignIn} />
            </>
          ) : (
            <>
              <UserView username={this.props.account.name} signout={this.props.onSignOut} />
            </>
          )}
        </section>
      </div>
    );
  }
}

export default AuthProvider(MicrosoftOauthView);
