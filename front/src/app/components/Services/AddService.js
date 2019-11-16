import React, {Component} from 'react';
import AddGithubService from "./AddGithubService";

class AddService extends Component
{
  render() {
    switch (this.props.service.name) {
      case "github":
        return (<AddGithubService username={this.props.username} />);
      default:
        return (<></>);
    }
  }
}



export default AddService;
