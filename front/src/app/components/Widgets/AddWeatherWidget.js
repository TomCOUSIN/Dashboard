import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";

class AddWeatherWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      city_name: undefined,
      country_code: undefined,
    };
    this.show = this.show.bind(this);
    this.submitWidget = this.submitWidget.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
  }

  show(show) {
    this.setState({show: show});
  }

  submitWidget(event) {
    WidgetClient.postWeatherWidget(this.props.username, this.state.city_name, this.state.country_code)
      .then(response => console.log(response));
    alert(this.state.city_name);
    alert(this.state.country_code);
    this.setState({show: false});
    this.setState({city_name: undefined});
    this.setState({country_code: undefined});
    event.preventDefault();
  }

  changeCity(event) {
    this.setState({city_name: event.target.value});
  }

  changeCountry(event) {
    this.setState({country_code: event.target.value});
  }

  render() {
    if (!this.state.show) {
      return (
        <div className='App-add-weather-widget'>
          <button onClick={() => this.show(true)}>Add Weather Widget</button>
        </div>
      );
    } else {
      return (
        <div className='App-add-weather-widget'>
          <form onSubmit={this.submitWidget}>
            <label>
              city_name :
              <input type="text" value={this.state.city_name} onChange={this.changeCity} />
            </label>
            <label>
              country_code :
              <input type="text" value={this.state.country_code} onChange={this.changeCountry} />
            </label>
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      );
    }
  }
}

export default AddWeatherWidget;
