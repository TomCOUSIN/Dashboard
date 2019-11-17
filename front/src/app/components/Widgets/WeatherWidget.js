import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class WeatherWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
      time: 0,
      error: false,
    };
    this.refreshWidget = this.refreshWidget.bind(this);
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
    WidgetClient.fetchWeather(this.props.widget.params[0], this.props.widget.params[1])
      .then(response => this.verifyWidgetError(response));
  }

  refreshWidget() {
    this.timer = setInterval(() => this.setState({
      time: this.state.time + 1
    }), 1000);
    if (this.timer >= 10000 && this.state.widgetContent) {
      WidgetClient.fetchWeather(this.props.widget.params[0], this.props.widget.params[1])
        .then(response => this.verifyWidgetError(response));
    }
  }

  removeWidget() {
    WidgetClient.deleteWidget(this.props.widget)
      .then(response => console.log(response));
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
          <p>{this.state.widgetContent.data.pressure}</p>
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
