/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import chai from "chai";

import YouTubeURLParser, { YouTubeURLException } from "../src/utils/YouTubeURLParser";

let expect = chai.expect;

describe("YouTubeURLParser", function () {
  it("should init a object for a youtube web url", function () {
    const url = "https://www.youtube.com/watch?v=foo123test",
      initFunc = function () {
        return new YouTubeURLParser(url);
      };

    expect(initFunc).to.not.throw();
    expect(initFunc()).to.be.an.instanceof(YouTubeURLParser);
  });

  it("should init a object for a youtube embed url", function () {
    const url = "https://www.youtube.com/embed/foo123test",
      initFunc = function () {
        return new YouTubeURLParser(url);
      };

    expect(initFunc).to.not.throw();
    expect(initFunc()).to.be.an.instanceof(YouTubeURLParser);
  });

  it("should init a object for a youtube shortener url", function () {
    const url = "https://youtu.be/foo123test",
      initFunc = function () {
        return new YouTubeURLParser(url);
      };

    expect(initFunc).to.not.throw();
    expect(initFunc()).to.be.an.instanceof(YouTubeURLParser);
  });

  it("should thrown YouTubeURLException for a invalid url", function () {
    const url = "foo123test",
      initFunc = function () {
        return new YouTubeURLParser(url);
      };

    expect(initFunc).to.throw(YouTubeURLException);
  });

  it("should thrown YouTubeURLException for a invalid YouTube url", function () {
    const url = "http://google.com/foo123test",
      initFunc = function () {
        return new YouTubeURLParser(url);
      };

    expect(initFunc).to.throw(YouTubeURLException);
  });

  describe("getVideoID", function () {
    before(function () {
      this.videoID = "foo123test";
    });

    it("should return video id from youtube web url", function () {
      const url = `https://www.youtube.com/watch?v=${this.videoID}`,
        parser = new YouTubeURLParser(url);

      expect(parser.getVideoID()).to.equal(this.videoID);
    });

    it("should return video id from youtube embed url", function () {
      const url = `https://www.youtube.com/embed/${this.videoID}`,
        parser = new YouTubeURLParser(url);

      expect(parser.getVideoID()).to.equal(this.videoID);
    });

    it("should return video if from youtube shortener url", function () {
      const url = `https://youtu.be/${this.videoID}`,
        parser = new YouTubeURLParser(url);

      expect(parser.getVideoID()).to.equal(this.videoID);
    });
  });
});
