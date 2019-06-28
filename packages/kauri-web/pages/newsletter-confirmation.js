import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/MaterialLayout";
import NewsletterConfirmation from "../components/containers/NewsletterConfirmation";
import { withRouter } from "next/router";

class NewsletterConfirmationPage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <NewsletterConfirmation category={"kauri"} />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(NewsletterConfirmationPage);
