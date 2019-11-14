import React, {Component} from 'react'
import UserWidgets from "../components/UserWidgets";
import AvailableWidgets from "../components/AvailableWidgets";

class WidgetView extends Component
{
  render() {
    return (
      <div className="App-widget-view">
        <AvailableWidgets username={this.props.username} />
        <UserWidgets username={this.props.username} />
      </div>
    );
  }
}

export default WidgetView;
