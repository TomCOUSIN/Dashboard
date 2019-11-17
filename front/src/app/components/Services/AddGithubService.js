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
          <button id={'add-button'} onClick={() => this.setState({show: true})}>Add Github Service</button>
        </div>
      );
    } else {
      return (
        <div>
          <form id={'App-add-form'} style={{width: '300px'}} onSubmit={this.submitService}>
            <label style={{margin: '1px'}}>
              Username :
              <input style={{'margin-left': '3px', 'margin-right': '3px', 'border-radius':'5px'}} type="text" value={this.state.username} onChange={this.changeGithubUsername} />
            </label>
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      );
    }
  }
}

export default AddGithubService;
