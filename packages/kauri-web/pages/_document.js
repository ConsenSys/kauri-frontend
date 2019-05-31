import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Helmet from "react-helmet";
// NOTE: GLOBAL/EXTERNAL CSS/LESS FILES ARE NOW IMPORTED IN WITH-DATA.jS
import { ServerStyleSheets } from "@material-ui/styles";

const config = require("../config").default;

const isProduction = process.env.NODE_ENV !== "development";

const scripts = [];
if (isProduction) {
  // HotJar
  scripts.push({
    crossOrigin: "anonymous",
    innerHTML: config.hotJarTrackingCode,
  });
}

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const styleTags = sheet.getStyleElement();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = renderPage;

    renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const page = renderPage();

    return {
      ...page,
      styleTags,
      styles: <React.Fragment>{sheets.getStyleElement()}</React.Fragment>,
      helmet: Helmet.renderStatic(),
    };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(
        el =>
          el !== "htmlAttributes" && el !== "bodyAttributes" && el !== "title"
      )
      .map(el => this.props.helmet[el].toComponent());
  }

  get helmetJsx() {
    return (
      <Helmet
        htmlAttributes={{ lang: "en" }}
        meta={[{ charSet: "utf8" }]}
        script={scripts}
      />
    );
  }

  render() {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          {this.helmetHeadComponents}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://transloadit.edgly.net/releases/uppy/v0.24.3/dist/uppy.min.css"
          />
          <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {this.props.styleTags}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
