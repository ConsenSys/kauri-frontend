import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import analytics from "../lib/analytics";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      main: "#efefef",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    analytics.init();
  }

  render() {
    analytics.page(this.props.router);
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>
            Beginner to Advanced Blockchain & Ethereum Tutorials - Kauri
          </title>
          <script
            type="text/javascript"
            src="//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
            data-dojo-config="usePlainJson: true, isDebug: false"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                'window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us17.list-manage.com","uuid":"e46233ccfd6bb938ab7cbb5a3","lid":"f49f81a2a9","uniqueMethods":true}) })',
            }}
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
