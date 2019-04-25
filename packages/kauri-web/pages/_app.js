import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import analytics from "../lib/analytics";

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor (props) {
    super(props);
    analytics.init();
  }

  render () {
    analytics.page(this.props.router);
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>
            Blockchain Tutorials for Beginners & Advanced | Learn Blockchain | Learn Ethereum - Kauri
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
                "window.dojoRequire([\"mojo/signup-forms/Loader\"], function(L) { L.start({\"baseUrl\":\"mc.us17.list-manage.com\",\"uuid\":\"e46233ccfd6bb938ab7cbb5a3\",\"lid\":\"f49f81a2a9\",\"uniqueMethods\":true}) })",
            }}
          />
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
