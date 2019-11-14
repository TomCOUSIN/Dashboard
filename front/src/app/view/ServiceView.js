import React, {Component} from 'react'
import UserServices from "../components/UserServices";

class ServiceView extends Component
{
  render() {
    return (
      <div className="App-service-view">
        <UserServices username={this.props.username} />
      </div>
    );
  }
}

export default ServiceView;
