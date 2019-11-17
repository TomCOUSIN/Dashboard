import React, {Component} from 'react';
import WidgetView from "./WidgetView";
import ServiceView from "./ServiceView";

class UserView extends Component
{
  render() {
    return (
      <div>
        <div style={{'background-color': '#9370DB', 'text-align': 'center', padding: "10px"}}>
          <label style={{'color': 'white', 'font-size': 40}}>Welcome {this.props.username} !</label>
        </div>
        <ServiceView username={this.props.username} />
        <WidgetView username={this.props.username} />
        <div id={'sign-out-footer'} onClick={this.props.signout}>
          <label id={'sign-out-footer-label'}>Sign Out</label>
        </div>
      </div>
    );
  }
}

export default UserView;

