import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";
import '../../App.css';
import AddService from "./Services/AddService";

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
        <ul>
          {this.state.availableServices.map(function(item, id) {
            return <li key={id}><AddService service={item} username={this.props.username}/></li>
          }, this)}
        </ul>
      </div>
    );
  }
}

export default AvailableServices;
