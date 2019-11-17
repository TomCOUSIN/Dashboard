import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";
import DashboardAPIClient from "../../services/DashboardAPIClient";

class AddGithubUserWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      user_services: undefined,
    };
    this.submitWidget = this.submitWidget.bind(this);
    this.submitWidgetIfUserAuthorized = this.submitWidgetIfUserAuthorized.bind(this);
  }

  submitWidgetIfUserAuthorized(response) {
    const github_service = response.find(element => element.name === "github");
    if (github_service) {
      WidgetClient.postGithubUserWidget(this.props.username,  github_service.params[0])
        .then(response => console.log(response));
    } else {
      alert("User hasn't subscribe to github service !");
    }
  }

  submitWidget() {
    DashboardAPIClient.getUserAvailableServices(this.props.username)
      .then(response => this.submitWidgetIfUserAuthorized(response));
  }

  render() {
    return (
      <div className='App-add-github-user-widget'>
        <button id={'add-button'} onClick={this.submitWidget}>Github-User</button>
      </div>
    );
  }
}

export default AddGithubUserWidget;
