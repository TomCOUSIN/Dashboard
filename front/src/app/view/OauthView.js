import React, {Component} from 'react';
import DashboardAPIClient from "../services/DashboardAPIClient";
import ServiceView from "./ServiceView";

class OauthView extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      is_user_connected: false,
    }
  }

  onChange(event) {
    this.setState({value: event.target.value});
  }

  connect(event) {
    DashboardAPIClient.isUserExist(this.state.value).then(response => {
      if (response.success) {
        this.setState({is_user_connected: true});
      }
    });
    event.preventDefault();
  }

  render() {
    if (!this.state.is_user_connected) {
      return (
        <div className="OauthView">
          <form onSubmit={this.connect.bind(this)}>
            <label>
              UserName :
              <input type="text" value={this.state.value} onChange={this.onChange.bind(this)}/>
            </label>
            <input type="submit" value="Send"/>
          </form>
        </div>
      );
    } else {
      return (
        <ServiceView username={this.state.value} />
      );
    }
  }
}

export default OauthView;
