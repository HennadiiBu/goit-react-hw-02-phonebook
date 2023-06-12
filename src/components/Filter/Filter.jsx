import React, { Component } from 'react';

export default class Filter extends Component {
  state = {
    name: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.props.findContact(this.state.name);
  };

  render() {
    return (
      <div>
        {' '}
        <p>Find contacts by name</p>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
