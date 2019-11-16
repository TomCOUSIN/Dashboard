import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";
import '../../App.css';

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
            return <li key={id} style={{display: 'inline-block'}}> {item.name} </li>
          })}
        </ul>
      </div>
    );
  }
}

export default UserServices;
