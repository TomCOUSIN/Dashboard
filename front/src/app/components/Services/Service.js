import React, {Component} from 'react';
import DashboardAPIClient from "../../services/DashboardAPIClient";
import WidgetClient from "../../services/WidgetClient";

class Service extends Component
{
  constructor(props) {
    super(props);
    this.retrieveAndRemoveAssociatedWidget = this.retrieveAndRemoveAssociatedWidget.bind(this);
    this.removeAssociatedWidget = this.removeAssociatedWidget.bind(this);
    this.removeService = this.removeService.bind(this);
  }

  removeAssociatedWidget(service, widgets) {
    widgets.forEach(function(item) {
        if (item.service === service.name) {
          WidgetClient.deleteWidget(item)
            .then(response => console.log(response));
        }
      });
  }

  retrieveAndRemoveAssociatedWidget(service) {
    DashboardAPIClient.getUserAvailableWidgets(service.user)
      .then(response => this.removeAssociatedWidget(service, response));
  }

  removeService() {
    DashboardAPIClient.deleteService(this.props.service.id)
      .then(() => this.retrieveAndRemoveAssociatedWidget(this.props.service));

  }

  render() {
    return (
      <div className={'App-service'}>
        <p>{this.props.service.name}</p>
        {this.props.service.name === 'microsoft' ? (<> <p>Log as {this.props.service.user}</p> </> ) : (<></>)}
        {this.props.service.params[0] && this.props.service.name !== 'microsoft' ? (<> <p>Log as {this.props.service.params[0]}</p> </> ) : (<></>)}
        <button className={'App-remove-widget-button'} onClick={() => this.removeService()}>REMOVE</button>
      </div>
    );
  }
}

export default Service;
