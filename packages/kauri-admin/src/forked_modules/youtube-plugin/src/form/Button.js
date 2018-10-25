/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

export default class Button extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="bs-btn bs-btn--blue bs-btn--small" type="button" onClick={this.props.onClick}>
        {this.props.label}
      </button>
    );
  }
}
