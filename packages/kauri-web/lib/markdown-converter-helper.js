import React from "react";
import { ContentState, convertToRaw, convertFromHTML } from "draft-js";
import Showdown from "showdown";
import ReactShowdown from "react-showdown";
import { H4 } from "../../kauri-components/components/Typography";
import Image from "../../kauri-components/components/Image";

Showdown.extension("highlightjs", function () {
  return [
    {
      type: "output",
      regex: new RegExp("<code>", "g"),
      replace: "<code class=\"hljs\">",
    },
  ];
});

Showdown.extension("links-open-in-new-window", function () {
  return [
    {
      type: "output",
      regex: new RegExp("<a href=\"(?!mailto|#)", "g"),
      replace: "<a target=\"_blank\" href=\"",
    },
  ];
});

Showdown.extension("test", function () {
  return [
    {
      type: "lang",
      regex: /!\[.*\]\((.*)\)/g,
      replace: (s, match) => {
        console.log(s);
        console.log(match);
        return `<Image height=400px width=400px image="${match}" />`;
      },
    },
  ];
});

const converter = new ReactShowdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: ["highlightjs", "links-open-in-new-window", "test"],
  components: { Image: Image },
});

const serverDOMBuilder = html => {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;

  const {
    document: jsdomDocument,
    HTMLElement,
    HTMLAnchorElement,
    HTMLImageElement,
  } = new JSDOM("<!DOCTYPE html>").window;
  // HTMLElement and HTMLAnchorElement needed on global for convertFromHTML to work
  global.HTMLElement = HTMLElement;
  global.HTMLAnchorElement = HTMLAnchorElement;
  global.HTMLImageElement = HTMLImageElement;

  const doc = jsdomDocument.implementation.createHTMLDocument("foo");
  doc.documentElement.innerHTML = html;
  const body = doc.getElementsByTagName("body")[0];
  return body;
};

const contentStateFromHTML = html => {
  // if DOMBuilder is undefined convertFromHTML will use the browser dom,
  //  hence we set DOMBuilder to undefined when document exist
  let DOMBuilder =
    typeof document === "undefined" ? serverDOMBuilder : undefined;
  const blocksFromHTML = convertFromHTML(html, DOMBuilder);
  return ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
};

const showdownConverter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const getHTMLFromMarkdown = (markdown, type) =>
  type === "outline"
    ? showdownConverter.makeHtml(markdown)
    : converter.convert(markdown);

const getRawStateFromMarkdown = markdown => {
  const html = showdownConverter.makeHtml(markdown);
  const contentState = contentStateFromHTML(html);
  return convertToRaw(contentState);
};

export {
  serverDOMBuilder,
  contentStateFromHTML,
  getHTMLFromMarkdown,
  getRawStateFromMarkdown,
};
