import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";
import AddUserServiceButton from "./AddUserServiceButton";
import UserServiceState from "./UserServiceState";
import '../../App.css';
import DeleteUserServiceButton from "./DeleteUserServiceButton";

class UserServices extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      userServices: [{name: "User has no Services"}],
    };
    this.retrieveUserServices = this.retrieveUserServices.bind(this);
  }

  retrieveUserServices() {
    DashboardAPIClient.getUserAvailableServices(this.props.username).then(response => {
      this.setState({userServices: response})
    });
  }

  render() {
    this.retrieveUserServices();
    return (
      <div className="App-user-services">
        <p>User Services</p>
        <ul>
          {this.state.userServices.map(function(item, id) {
            return <li key={id}>
              {item.name}
            </li>
          })}
        </ul>
        <UserServiceState user_services={this.state.userServices} username={this.props.username} />
        <AddUserServiceButton service='github' username={this.props.username} url='http://api.github.com' />
        <AddUserServiceButton service='weather' username={this.props.username} url='http://api.openweathermap.org/data/2.5' />
        <DeleteUserServiceButton service='github' username={this.props.username} />
        <DeleteUserServiceButton service='weather' username={this.props.username} />
      </div>
    );
  }
}

export default UserServices;
