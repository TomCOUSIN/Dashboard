import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class WeatherWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      widgetContent: undefined,
    };
  }
  componentDidMount() {
    WidgetClient.fetchWeather(this.props.widget.params[0], this.props.widget.params[1])
      .then(response => this.setState({widgetContent: response}));
  }

  render() {
    if (this.state.widgetContent) {
      return (
        <div className='App-weather-widget'>
          <p>{this.props.widget.params[0]}</p>
          <p>{Math.round(this.state.widgetContent.data.temperature - 273.15)}°C</p>
          <p>{this.state.widgetContent.data.pressure}</p>
          <p style={{color: 'blue'}}>{this.state.widgetContent.data.humidity}%</p>
        </div>
      );
    } else {
      return (<></>);
    }
  }
}

export default WeatherWidget;
