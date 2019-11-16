import React, {Component} from 'react'
import UserServices from "../components/UserServices";
import AvailableServices from "../components/AvailableServices";

class ServiceView extends Component
{
  render() {
    return (
      <div className="App-service-view">
        <AvailableServices username={this.props.username} />
        <UserServices username={this.props.username} />
      </div>
    );
  }
}

export default ServiceView;
