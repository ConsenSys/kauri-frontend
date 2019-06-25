import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
// NOTE: GLOBAL/EXTERNAL CSS/LESS FILES ARE NOW IMPORTED IN WITH-DATA.jS
import { ServerStyleSheets } from "@material-ui/styles";

const config = require("../config").default;

const isProduction = process.env.NODE_ENV !== "development";

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
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {isProduction && process.browser && (
            <script>
              `$
              {(function(h, o, t, j, a, r) {
                h.hj =
                  h.hj ||
                  function() {
                    (h.hj.q = h.hj.q || []).push(arguments);
                  };
                h._hjSettings = { hjid: 734967, hjsv: 6 };
                a = o.getElementsByTagName("head")[0];
                r = o.createElement("script");
                r.async = 1;
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                a.appendChild(r);
              })(
                window,
                document,
                "https://static.hotjar.com/c/hotjar-",
                ".js?sv="
              )}
              `
            </script>
          )}
          <meta charSet="UTF-8" />
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
