/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import { shallow } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";

import YouTube from "../src/YouTube";

chai.use(chaiEnzyme());
let expect = chai.expect;

describe("YouTube", function () {
  before(function () {
    this.videoID = "m_3CM04TM2g";
  });

  it("should render nothing when no VideoID", function () {
    const wrapper = shallow(
      <YouTube />
    );
    expect(wrapper).to.exist;
    expect(wrapper.find("iframe")).to.not.exist;
  });

  it("should render iframe when VideoID was given", function () {
    const wrapper = shallow(
      <YouTube videoID={ this.videoID }/>
    );
    expect(wrapper.find("iframe")).to.exist;
  });

  it("should render iframe with expected url as source", function () {
    const expectedURL = `https://www.youtube.com/embed/${this.videoID}`,
      wrapper = shallow(
        <YouTube videoID={ this.videoID }/>
      );
    expect(wrapper.find("iframe")).to.have.prop("src", expectedURL);
  });
});
