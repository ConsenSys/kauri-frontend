/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import { mount } from "enzyme";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";

import { MegadraftIcons } from "megadraft";

import Block from "../src/Block";
import YouTube from "../src/YouTube";

chai.use(chaiEnzyme());
let expect = chai.expect;

global.__ = global.window.__;

describe("Block", function () {
  before(function () {
    this.data = {
      videoID: "m_3CM04TM2g"
    };

    this.remove = sinon.spy();
    this.updateData = sinon.spy();
    this.plugin = sinon.spy();

    this.renderBlock = function (data={}) {
      return mount(
        <Block container={this} blockProps={this} data={data} />
      );
    };
  });

  describe("New", function () {
    before(function () {
      this.block = this.renderBlock();
    });

    it("should render pre with PREVIEW", function () {
      const wrapper = this.block.find("pre").first();
      expect(wrapper).to.exist;
      expect(wrapper).to.have.text("PREVIEW");
    });

    it("should not render YouTube component", function () {
      expect(this.block.find(YouTube)).to.not.exist;
    });

    it("should render input with no value", function () {
      const wrapper = this.block.find("input").first();
      expect(wrapper).to.have.prop("value", "");
    });
  });

  describe("Edit", function () {
    before(function () {
      this.block = this.renderBlock(this.data);
    });

    it("should not render pre component", function () {
      expect(this.block.find("pre")).to.not.exist;
    });

    it("should not render YouTube component with expected url", function () {
      const wrapper = this.block.find(YouTube).first();
      expect(wrapper).to.exist;
      expect(wrapper).to.have.prop(
        "videoID",
        this.data.videoID
      );
    });

    it("should set input value from videoID props", function () {
      const inputElement = this.block.find("input").first();
      expect(inputElement).to.have.prop(
        "value",
        `https://www.youtube.com/embed/${this.data.videoID}`
      );
    });
  });

  describe("Actions", function () {
    beforeEach(function () {
      this.block = this.renderBlock(this.data);
    });

    it("should have a delete action", function () {
      expect(this.block.instance().actions).to.have.lengthOf(1);
      expect(this.block.instance().actions).to.deep.equal([{
        "key": "delete",
        "icon": MegadraftIcons.DeleteIcon,
        "action": this.block.props().container.remove
      }]);
    });

    it("onChange input should update input value prop with new url", function () {
      const inputElement = this.block.find("input").first(),
        newUrl = "https://www.youtube.com/embed/123456";

      inputElement.simulate(
        "change",
        { target: { value: newUrl } }
      );

      expect(inputElement).to.have.prop("value", newUrl);
    });
  });

  describe("on loadMedia", function () {
    beforeEach(function () {
      this.updateData = sinon.spy();
      this.block = this.renderBlock();
      this.debounceStub = sinon.stub(this.block.instance(), "loadMedia")
        .callsFake(Block.prototype.loadMedia);
    });

    describe("with valid url", function () {
      beforeEach(function () {
        this.newVideoID = "123456";
        this.newUrl = `https://www.youtube.com/embed/${this.newVideoID}`;

        this.block.setState({url: this.newUrl});
      });

      it("should update block videoID state with newVideoID", function () {
        expect(this.block).to.have.state("videoID", this.newVideoID);
      });

      it("should render YouTube component with newVideoID as videoID props", function () {
        const youTubeElement = this.block.find(YouTube).first();
        expect(youTubeElement).to.exist;
        expect(youTubeElement).to.have.prop("videoID", this.newVideoID);
      });

      it("should call container updateData with newVideoID as videoID", function () {
        sinon.assert.calledOnce(this.updateData);
        sinon.assert.calledWith(this.updateData, { videoID: this.newVideoID });
      });
    });

    describe("with invalid url", function () {
      beforeEach(function () {
        this.newVideoID = "123456";
        this.newUrl = `https://www.yoltub123.com/embed/${this.newVideoID}`;

        this.block.setState({url: this.newUrl});
      });

      it("should update block videoID state to no value", function () {
        expect(this.block).to.not.have.state("videoID");
      });

      it("should not render YouTube component", function () {
        expect(this.block.find(YouTube)).to.not.exist;
      });

      it("should call container updateData with undefined as videoID", function () {
        sinon.assert.calledOnce(this.updateData);
        sinon.assert.calledWith(this.updateData, { videoID: undefined });
      });

      it("should render pre with INVALID URL", function () {
        const wrapper = this.block.find("pre").first();
        expect(wrapper).to.exist;
        expect(wrapper).to.have.text("INVALID YOUTUBE URL");
      });
    });
  });
});
