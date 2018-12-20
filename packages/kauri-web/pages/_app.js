import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import pageAnalytics from "../lib/pageAnalytics";

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
    pageAnalytics.init();
  }

  render() {
    pageAnalytics.page(this.props.router);
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Kauri</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
