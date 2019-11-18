import React, {Component} from 'react';

class MailWidget extends Component
{
  render() {
    return (
      <div className={'App-widget'}>
        <p>Subject: {this.props.widget.subject}</p>
        <p>From: {this.props.widget.from.userAddress.address}</p>
        <p>Date: {this.props.widget.date}</p>
      </div>
    );
  }
}

export default MailWidget;
