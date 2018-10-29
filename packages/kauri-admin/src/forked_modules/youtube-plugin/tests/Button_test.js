/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import { shallow } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import { editorStateFromRaw } from "megadraft";

import Button from "../src/Button";

chai.use(chaiEnzyme());
let expect = chai.expect;

describe("Button", function () {
  it("exist", function() {
    const wrapper = shallow(<Button />);
    expect(wrapper).to.exist;
  });

  it("click should call onChange props", function() {
    const onChangeStub = sinon.stub(),
      wrapper = shallow(
        <Button
          onChange={onChangeStub}
          editorState={editorStateFromRaw(null)}
        />
      );

    wrapper.simulate("click");
    sinon.assert.calledOnce(onChangeStub);
  });
});
