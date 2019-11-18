import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class WeatherWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
      error: false,
      intervalId: undefined,
      currentCount: 60,
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
    WidgetClient.fetchWeather(this.props.widget.params[0], this.props.widget.params[1])
      .then(response => this.verifyWidgetError(response));
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
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
      WidgetClient.fetchWeather(this.props.widget.params[0], this.props.widget.params[1])
        .then(response => this.verifyWidgetError(response));
      this.setState({ currentCount: 60 });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className='App-weather-widget'>
          <p>Weather Widget</p>
          <p>An Error Occured</p>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    }
    else if (this.state.widgetContent) {
      return (
        <div className='App-weather-widget'>
          <p>{this.props.widget.params[0]}</p>
          <p>{Math.round(this.state.widgetContent.data.temperature - 273.15)}°C</p>
          <p>{this.state.widgetContent.weather[0].main}</p>
          <p style={{color: 'blue'}}>{this.state.widgetContent.data.humidity}%</p>
          <button className={'App-remove-widget-button'} onClick={() => this.removeWidget()}>REMOVE</button>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default WeatherWidget;
