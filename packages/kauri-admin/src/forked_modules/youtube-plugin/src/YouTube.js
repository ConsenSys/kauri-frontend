/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

export default class YouTube extends Component {
  render() {
    if (!this.props.videoID) {
      return null;
    }

    const url = `https://www.youtube.com/embed/${this.props.videoID}`;
    return (
      <div className="megadraft-youtube">
        <iframe title="megadraft-youtube" src={url} width="640px" height="360px" frameBorder="0" allowFullScreen />
      </div>
    );
  }
}
