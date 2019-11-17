import React, {Component} from 'react';
import WeatherWidget from "./WeatherWidget";
import GithubUserWidget from "./GithubUserWidget";
import GithubReposWidget from "./GithubReposWidget";

class Widget extends Component
{
  render() {
    switch (this.props.widget.name) {
      case "weather":
        return (<WeatherWidget widget={this.props.widget}/>);
      case "github-user":
        return (<GithubUserWidget widget={this.props.widget}/>);
      case "github-repos":
        return (<GithubReposWidget widget={this.props.widget}/>);
      default:
        return (<></>);
    }
  }
}

export default Widget;
