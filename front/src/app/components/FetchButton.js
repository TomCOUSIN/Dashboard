import React, {Component} from 'react'
import DashboardAPIClient from "../services/DashboardAPIClient";

class FetchButton extends Component
{
  fetch() {
    alert("fetch");
    DashboardAPIClient.fetch("/services");
    alert("fin du fetch")
  }

  render() {
    return (
      <button onClick={this.fetch}>"Hey !"</button>
    );
  }
}

export default FetchButton;
