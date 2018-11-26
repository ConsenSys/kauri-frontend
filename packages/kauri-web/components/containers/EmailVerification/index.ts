import Activation from "./View";
import { compose } from "react-apollo";
// import { graphql } from "react-apollo";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../lib/Module";
// import withLoading from "../../../lib/with-loading";
import { withRouter } from "next/router";

interface IState {
  app: {
    hostName: string;
  };
}

interface IProps {
  router: any;
}

const mapStateToProps = (props: IProps, state: IState) => {
  return { hostName: state.app && state.app.hostName, uuid: props.router };
};

// const QUERY_NAME = "ArticlesQuery";

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  )
  //   graphql(GRAPH_QUERY_OBJECT, {
  //     name: QUERY_NAME,
  //     options: () => ({
  //       fetchPolicy: "no-cache",
  //       variables: {},
  //     }),
  //   }),
)(withRouter(Activation));
