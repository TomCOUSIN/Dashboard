import React, {Component} from 'react';
import DashboardAPIClient from "../services/DashboardAPIClient";
import AddWidget from "./Widgets/AddWidget";

class AvailableWidgets extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      availableWidgets: [{name: "No Widgets Found Yet"}],
    }
  }

  componentDidMount() {
    DashboardAPIClient.getAvailableWidgets()
      .then(response => this.setState({availableWidgets: response}));
  }

  render() {
    return (
      <div className='App-available-widgets'>
        <ul>
          {this.state.availableWidgets.map(function(item, id) {
            return <li key={id} style={{display: 'inline-block'}}><AddWidget widget={item} username={this.props.username} /></li>
          }, this)}
        </ul>
      </div>
    );
  }
}

export default AvailableWidgets;
