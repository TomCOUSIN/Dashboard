import React, {Component} from 'react';

class AddUserService extends Component
{
  render() {
    return (
      <div className="App-add-user-service">
        <div className="App-add-github-service">
          <label>Github:</label>
          <p>{this.props.user_services.find(function (element) {return element.name === "github";}) ? 'OK' : 'KO'}</p>
        </div>
        <div className="App-add-weather-service">
          <label>Weather:</label>
          <p>{this.props.user_services.find(function (element) {return element.name === "weather";}) ? 'OK' : 'KO'}</p>
        </div>
      </div>
    );
  }
}

export default AddUserService;
