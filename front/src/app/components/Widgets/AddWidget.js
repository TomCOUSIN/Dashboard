import React, {Component} from 'react';
import AddWeatherWidget from "./AddWeatherWidget";
import AddGithubUserWidget from "./AddGithubUserWidget";

class AddWidget extends Component
{
  render() {
    switch (this.props.widget.name) {
      case "weather":
        return (<AddWeatherWidget username={this.props.username} />);
      case "github-user":
        return (<AddGithubUserWidget username={this.props.username} />);
      case "github-repos":
        return (<></>);
      default:
        return (<></>);
    }
  }
}

export default AddWidget;
