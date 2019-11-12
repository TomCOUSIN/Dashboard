import React, {Component} from 'react';
import DashboardAPIClient from "../services/DashboardAPIClient";

class DeleteUserServiceButton extends Component
{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    DashboardAPIClient
      .deleteUserService(this.props.service, this.props.username)
      .then(response => {
        alert(response.success ? 'OK' : 'KO');
      });
  }

  render() {
    return (
      <div className="App-delete-user-services-button">
        <button onClick={this.onClick}>Delete {this.props.service}</button>
      </div>
    );
  }
}

export default DeleteUserServiceButton;
