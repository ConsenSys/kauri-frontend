import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
// NOTE: GLOBAL/EXTERNAL CSS/LESS FILES ARE NOW IMPORTED IN WITH-DATA.jS

const isProduction = process.env.NODE_ENV !== "development";

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => <App {...props} />);
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      styleTags,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {!isProduction && process.browser && (
            <script>
              {`${(function(h, o, t, j, a, r) {
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
              `}
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
            content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1"
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
