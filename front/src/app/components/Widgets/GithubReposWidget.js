import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";
import Widget from "./Widget";

class GithubReposWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
    };
  }
  componentDidMount() {
    WidgetClient.fetchGithubRepos(this.props.widget.params[0])
      .then(response => this.setState({widgetContent: response}));
  }

  render() {
    if (this.state.widgetContent) {
      return (
        <div className='App-github-repos-widget'>
          <ul>
            {this.state.widgetContent.map(function(item, id) {
              return <li key={id}>{item.name}<br />{item.description}</li>
            })}
          </ul>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default GithubReposWidget;
