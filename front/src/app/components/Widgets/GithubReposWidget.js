import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class GithubReposWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
      error: undefined,
    };
    this.verifyWidgetError = this.verifyWidgetError.bind(this);
  }

  verifyWidgetError(response) {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      this.setState({widgetContent: response.data});
      this.setState({error: false});
    }
    else {
      this.setState({error: true});
    }
  }

  componentDidMount() {
    WidgetClient.fetchGithubRepos(this.props.widget.params[0])
      .then(response => this.verifyWidgetError(response));
  }

  removeWidget() {
    WidgetClient.deleteWidget(this.props.widget)
      .then(response => console.log(response));
  }

  render() {
    if (this.state.error) {
      return (
        <div className='App-weather-widget'>
          <p>Github-Repos Widget</p>
          <p>An Error Occured</p>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    } else if (this.state.widgetContent) {
      return (
        <div className='App-github-repos-widget'>
          <ul>
            {this.state.widgetContent.map(function(item, id) {
              return <li key={id}>{item.name}<br />{item.description}</li>
            })}
          </ul>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default GithubReposWidget;
