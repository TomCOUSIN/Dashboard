import React, {Component} from 'react';
import DashboardAPIClient from "../services/DashboardAPIClient";
import Widget from "./Widgets/Widget";

class UserWidgets extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      userWidgets: [{name: "User has no Widgets"}],
    };
    this.retrieveUserWidgets = this.retrieveUserWidgets.bind(this);
  }

  retrieveUserWidgets() {
    DashboardAPIClient.getUserAvailableWidgets(this.props.username)
      .then(response => this.setState({userWidgets: response}));
  }

  render() {
    this.retrieveUserWidgets();
    return (
      <div className='App-user-widgets'>
        <p>User Widgets</p>
        <ul>
          {this.state.userWidgets.map(function(item, id) {
            return <li style={{display: 'inline-block'}} key={id}><Widget widget={item} /></li>
          })}
        </ul>
      </div>
    );
  }
}

export default UserWidgets;
