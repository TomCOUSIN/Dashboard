import React, {Component} from 'react';
import WidgetClient from "../../services/WidgetClient";
import '../../../App.css'
import DashboardAPIClient from "../../services/DashboardAPIClient";

class AddMicrosoftMailWidget extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      mailCount: undefined,
    };
    this.submitWidget = this.submitWidget.bind(this);
    this.submitWidgetIfUserAuthorized = this.submitWidgetIfUserAuthorized.bind(this);
    this.show = this.show.bind(this);
    this.changeMailCount = this.changeMailCount.bind(this);
  }

  changeMailCount(event) {
    this.setState({mailCount: event.target.value});
  }

  show(show) {
    this.setState({show: show});
  }

  submitWidgetIfUserAuthorized(response) {
    const microsoft_service = response.find(element => element.name === "microsoft");
    if (microsoft_service) {
      WidgetClient.postMicrosoftMailWidget(this.props.username, this.state.mailCount)
        .then(response => console.log(response));
      this.setState({mailCount: undefined});
      this.setState({show: false});
    } else {
      alert("User hasn't subscribe to microsoft service !");
    }
  }

  submitWidget() {
    DashboardAPIClient.getUserAvailableServices(this.props.username)
      .then(response => console.log(response));
  }

  render() {
    if (this.state.show) {
      return (
        <div className='App-add-weather-widget'>
          <form id={'App-add-form'} onSubmit={() => this.submitWidget()}>
            <label style={{'margin-left': '2px', 'margin-right': '2px', }}>
              mailCount :
              <input style={{'margin-left': '2px', 'margin-right': '2px', 'border-radius':'5px'}} type="text" value={this.state.mailCount} onChange={this.changeMailCount} />
            </label>
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      );
    } else {
      return (
        <div className='App-add-weather-widget'>
          <button id={'add-button'} onClick={() => this.show(true)}>Microsoft-Mail
          </button>
        </div>
      );
    }
  }
}

export default AddMicrosoftMailWidget;
