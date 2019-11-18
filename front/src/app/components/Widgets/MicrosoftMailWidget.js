import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";
import Widget from "./Widget";
import MailWidget from "./MailWidget";

class MicrosoftMailWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
      error: false,
      currentCount: 60,
      intervalId: undefined,
    };
    this.verifyWidgetError = this.verifyWidgetError.bind(this);
    this.removeWidget = this.removeWidget.bind(this);
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
    WidgetClient.fetchMicrosoftMail(this.props.widget.user)
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
      WidgetClient.fetchMicrosoftMail(this.props.widget.user)
        .then(response => this.verifyWidgetError(response));
      this.setState({ currentCount: 60 });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className='App-widget'>
          <p>Microsoft Mail Widget</p>
          <p>An Error Occured</p>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    }
    else if (this.state.widgetContent) {
      return (
        <div className='App-widget'>
          <ul>
            {Array.apply(null, {length: Number(this.props.widget.params[0])}).map(function(item, id) {
              return <li key={id}><MailWidget widget={this.state.widgetContent.mailList[id]} /></li>
            }, this)}
          </ul>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default MicrosoftMailWidget;
