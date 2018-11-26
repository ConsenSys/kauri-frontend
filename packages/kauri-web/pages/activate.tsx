import React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import withData from "../lib/with-data";
import App from "../layouts/AppWithoutNavbar";
import { routeChangeAction } from "../lib/Module";
import EmailVerification from "../components/containers/EmailVerification";
import { withRouter } from "next/router";

interface IReduxState {
  app: { user: { id: string } };
}

const ConnectedEmailVerification = connect(
  (state: IReduxState) => ({
    userId: state.app && state.app.user && state.app.user.id,
  }),
  { routeChangeAction }
)(EmailVerification);

interface IProps {
  router: {
    query: {
      user_id: string;
    };
  };
}

interface IState {
  routeChangeAction: (url: string) => void;
  userId: string | undefined;
}

class EmailVerificationPage extends React.Component<IProps & IState> {
  render() {
    return (
      <App>
        <ConnectedEmailVerification />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withRouter
)(EmailVerificationPage);
