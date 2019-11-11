import React, {Component} from 'react'
import AvailableServices from "../components/AvailableServices";
import UserServices from "../components/UserServices";

class ServiceView extends Component
{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="UserDashboard">
        <header>
          <p>Welcome {this.props.username}</p>
        </header>
        <AvailableServices />
        <UserServices username={this.props.username} />
      </div>
    );
  }
}

export default ServiceView;
