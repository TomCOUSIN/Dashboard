import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class GithubUserWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
    };
  }
  componentDidMount() {
    WidgetClient.fetchGithubUser(this.props.widget.params[0])
      .then(response => this.setState({widgetContent: response}));
  }

  render() {
    if (this.state.widgetContent) {
      return (
        <div className='App-github-user-widget'>
          <p>{this.state.widgetContent.login}</p>
          <p>{this.state.widgetContent.bio}</p>
          <p>{this.state.widgetContent.email}</p>
          <p>{this.state.widgetContent.reposCount} repos</p>
          <p>{this.state.widgetContent.followers} followers</p>
          <p>Following {this.state.widgetContent.following}</p>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default GithubUserWidget;
