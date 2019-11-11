import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";
import '../../App.css';
import AddUserService from "./AddUserService";

class UserServices extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      userServices: [{name: "User has no Services"}],
    }
  }

  componentDidMount() {
    DashboardAPIClient.getUserAvailableServices(this.props.username).then(response => {
      this.setState({userServices: response})
    });
  }

  render() {
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
        <AddUserService user_services={this.state.userServices} />
      </div>
    );
  }
}

export default UserServices;
