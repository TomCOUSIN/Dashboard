import React, {Component} from 'react';
import DashboardAPIClient from "../../services/DashboardAPIClient";

class AddGithubService extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      username: undefined,
    };
    this.submitService = this.submitService.bind(this);
    this.changeGithubUsername = this.changeGithubUsername.bind(this);
  }

  changeGithubUsername(event) {
    this.setState({username: event.target.value});
  }

  submitService(event) {
    DashboardAPIClient.postUserService('github', this.props.username, [this.state.username])
      .then(response => console.log(response));
    this.setState({show: false});
    this.setState({username: undefined});
    event.preventDefault();
  }

  render() {
    if (!this.state.show) {
      return (
        <div>
          <button onClick={() => this.setState({show: true})}>Add Github Service</button>
        </div>
      );
    } else {
      return (
        <div >
          <form onSubmit={this.submitService}>
            <label>
              Username :
              <input type="text" value={this.state.username} onChange={this.changeGithubUsername} />
            </label>
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      );
    }
  }
}

export default AddGithubService;
