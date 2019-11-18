import React, {Component} from 'react';
import AddWeatherWidget from "./AddWeatherWidget";
import AddGithubUserWidget from "./AddGithubUserWidget";
import AddGithubReposWidget from "./AddGithubReposWidget";
import AddMicrosoftMailWidget from "./AddMicrosoftMailWidget";

class AddWidget extends Component
{
  render() {
    switch (this.props.widget.name) {
      case "weather":
        return (<AddWeatherWidget username={this.props.username} />);
      case "github-user":
        return (<AddGithubUserWidget username={this.props.username} />);
      case "github-repos":
        return (<AddGithubReposWidget username={this.props.username} />);
      case "microsoft-mails":
        return (<AddMicrosoftMailWidget username={this.props.username} />);
      default:
        return (<></>);
    }
  }
}

export default AddWidget;
