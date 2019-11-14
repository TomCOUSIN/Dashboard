import React, {Component} from 'react';
import DashboardAPIClient from "../services/DashboardAPIClient";

class AddUserServiceButton extends Component
{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    DashboardAPIClient
      .postUserService(this.props.service, this.props.username)
      .then(response => {
        alert(response.success ? 'OK' : 'KO');
      });
  }

  render() {
    return (
      <div className="App-add-user-services-button">
        <button onClick={this.onClick}>Add {this.props.service}</button>
      </div>
    );
  }
}

export default AddUserServiceButton;
