import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";
import '../../App.css';

class AvailableServices extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      availableServices: [{name: "No Services Found Yet"}],
    }
  }

  componentDidMount() {
    DashboardAPIClient.getAvailableServices().then(response => {
      this.setState({availableServices: response})
    });
  }

  render() {
    return (
      <div className="App-available-services">
        <p>Available Services</p>
        <ul>
          {this.state.availableServices.map(function(item, id) {
            return <li key={id}>{item.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default AvailableServices;
