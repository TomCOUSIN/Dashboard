import React, {Component} from 'react';
import WidgetView from "./WidgetView";
import ServiceView from "./ServiceView";

class UserView extends Component
{
  render() {
    return (
      <div>
        <section>Welcome {this.props.username} !</section>
        <WidgetView username={this.props.username} />
        <ServiceView username={this.props.username} />
      </div>
    );
  }
}

export default UserView;

