import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";
import '../../App.css';
import Service from "./Services/Service";

class UserServices extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      userServices: undefined,
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
    if (this.state.userServices) {
      return (
        <div className="App-user-services">
          <ul className={'App-service-list'}>
            {this.state.userServices.map(function (item, id) {
              return <li className={'App-service-list-item'} key={id}><Service service={item}/></li>
            })}
          </ul>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default UserServices;
