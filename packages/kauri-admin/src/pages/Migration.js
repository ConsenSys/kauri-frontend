import React, { Component } from 'react';

class Migration extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      config: props.config
    };

  }

  render() {
    return (
      <div className="Topics">
        <h1 className="Title">Migration</h1>
        <p>This page is under construction</p>

      </div>
    );
  }
}


export default Migration;