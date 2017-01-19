import React, { Component } from 'react';

export default class Quote extends Component {
  render() {
    return (
      <div className="centerText">
        <h3>{this.props.error ? this.props.error : this.props.author}</h3>
        <h5>
          {this.props.error ? "" : this.props.text}
        </h5>
      </div>
    );
  }
}
