import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import AppWithoutNavbar from "../layouts/AppWithoutNavbar";
import EmailVerification from "../components/containers/EmailVerification";
import { withRouter } from "next/router";

interface IProps {
  router: {
    query: {
      uuid: string;
    };
  };
}

class EmailVerificationPage extends React.Component<IProps, {}> {
  render() {
    return (
      <AppWithoutNavbar>
        <EmailVerification uuid={this.props.router.query.uuid} />
      </AppWithoutNavbar>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(EmailVerificationPage);
