import React, {Component} from 'react';
import WeatherWidget from "./WeatherWidget";

class Widget extends Component
{
  render() {
    switch (this.props.widget.name) {
      case "weather":
        return (<WeatherWidget widget={this.props.widget}/>);
      case "github-user":
        return (<></>);
      case "github-repos":
        return (<></>);
      default:
        return (<></>);
    }
  }
}

export default Widget;
