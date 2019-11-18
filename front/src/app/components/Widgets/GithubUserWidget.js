import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class GithubUserWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
      error: undefined,
      currentCount: 60,
      intervalId: undefined,
    };
    this.verifyWidgetError = this.verifyWidgetError.bind(this);
    this.refreshWidget = this.refreshWidget.bind(this);
  }

  verifyWidgetError(response) {
    if (response.status >= 200 && response.status < 300) {
      this.setState({widgetContent: response.data});
      this.setState({error: false});
    }
    else {
      this.setState({error: true});
    }
  }

  componentDidMount() {
    let intervalId = setInterval(this.refreshWidget, 1000);
    this.setState({intervalId: intervalId});
    WidgetClient.fetchGithubUser(this.props.widget.params[0])
      .then(response => this.verifyWidgetError(response));
  }

  removeWidget() {
    WidgetClient.deleteWidget(this.props.widget)
      .then(response => console.log(response));
  }

  refreshWidget() {
    let newCount = this.state.currentCount - 1;
    if(newCount >= 0) {
      this.setState({ currentCount: newCount });
    } else {
      WidgetClient.fetchGithubUser(this.props.widget.params[0])
        .then(response => this.verifyWidgetError(response));
      this.setState({ currentCount: 60 });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className='App-weather-widget'>
          <p>Github-User Widget</p>
          <p>An Error Occured</p>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    } else if (this.state.widgetContent) {
      return (
        <div className='App-github-user-widget'>
          <p>{this.state.widgetContent.login}</p>
          <p>{this.state.widgetContent.bio}</p>
          <p>{this.state.widgetContent.email}</p>
          <p>{this.state.widgetContent.reposCount} repos</p>
          <p>{this.state.widgetContent.followers} followers</p>
          <p>Following {this.state.widgetContent.following}</p>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default GithubUserWidget;
