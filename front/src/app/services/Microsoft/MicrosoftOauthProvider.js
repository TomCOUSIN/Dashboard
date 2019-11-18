import React, { Component } from "react";
import {
  msalApp,
  requiresInteraction,
  fetchMsGraph,
  isIE,
  GRAPH_ENDPOINTS,
  GRAPH_SCOPES,
  GRAPH_REQUESTS
} from "./microsoft-auth-utils";
import DashboardAPIClient from "../DashboardAPIClient";

// If you support IE, our recommendation is that you sign-in using Redirect APIs
const useRedirectFlow = isIE();
// const useRedirectFlow = true;

export default C =>
  class MicrosoftOauthProvider extends Component {
    constructor(props) {
      super(props);

      this.state = {
        account: null,
        error: null,
        graphProfile: null
      };
    }

    async acquireToken(request, redirect) {
      return msalApp.acquireTokenSilent(request).catch(error => {
        // Call acquireTokenPopup (popup window) in case of acquireTokenSilent failure
        // due to consent or interaction required ONLY
        if (requiresInteraction(error.errorCode)) {
          return redirect
            ? msalApp.acquireTokenRedirect(request)
            : msalApp.acquireTokenPopup(request);
        }
      });
    }

    async onSignIn(redirect) {
      if (redirect) {
        return msalApp.loginRedirect(GRAPH_REQUESTS.LOGIN);
      }

      const loginResponse = await msalApp
        .loginPopup(GRAPH_REQUESTS.LOGIN)
        .catch(error => {
          this.setState({
            error: error.message
          });
        });

      if (loginResponse) {
        this.setState({
          account: loginResponse.account,
          error: null
        });

        const tokenResponse = await this.acquireToken(
          GRAPH_REQUESTS.LOGIN
        ).catch(error => {
          this.setState({
            error: error.message
          });
        });

        if (tokenResponse) {
          this.retrieveServices(tokenResponse.accessToken);
          const graphProfile = await fetchMsGraph(
            GRAPH_ENDPOINTS.ME,
            tokenResponse.accessToken
          ).catch(() => {
            this.setState({
              error: "Unable to fetch Graph profile."
            });
          });

          if (graphProfile) {
            this.setState({
              graphProfile
            });
          }
        }
      }
    }

    retrieveServices(accessToken) {
      DashboardAPIClient.getUserAvailableServices(this.state.account.name)
        .then(response => this.patchMicrosoftService(response, accessToken));
    }

    patchMicrosoftService(response, accessToken) {
      let user_has_service = false;
      let microsoftService = undefined;
      response.forEach(function(item) {
        if (item.name === 'microsoft') {
          user_has_service = true;
          microsoftService = item;
        }
      });
      if (user_has_service) {
        DashboardAPIClient
          .patchUserService('microsoft', this.state.account.name, [accessToken], microsoftService.id)
          .then(response => console.log(response));
      }
      else {
        DashboardAPIClient
          .postUserService('microsoft', this.state.account.name, [accessToken])
          .then(response => console.log(response));
      }
    }

    onSignOut() {
      msalApp.logout();
    }

    async componentDidMount() {
      msalApp.handleRedirectCallback(error => {
        if (error) {
          const errorMessage = error.errorMessage ? error.errorMessage : "Unable to acquire access token.";
          // setState works as long as navigateToLoginRequestUrl: false
          this.setState({
            error: errorMessage
          });
        }
      });

      const account = msalApp.getAccount();

      this.setState({
        account
      });

      if (account) {
        const tokenResponse = await this.acquireToken(
          GRAPH_REQUESTS.LOGIN,
          useRedirectFlow
        );

        if (tokenResponse) {
          const graphProfile = await fetchMsGraph(
            GRAPH_ENDPOINTS.ME,
            tokenResponse.accessToken
          ).catch(() => {
            this.setState({
              error: "Unable to fetch Graph profile."
            });
          });

          if (graphProfile) {
            this.setState({
              graphProfile
            });
          }
        }
      }
    }

    render() {
      return (
        <C
          {...this.props}
          account={this.state.account}
          error={this.state.error}
          graphProfile={this.state.graphProfile}
          onSignIn={() => this.onSignIn(useRedirectFlow)}
          onSignOut={() => this.onSignOut()}
        />
      );
    }
  };
