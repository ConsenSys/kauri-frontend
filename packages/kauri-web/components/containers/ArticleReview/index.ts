import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { approveArticleAction, rejectArticleAction } from "./Module";
import { getArticle } from "../../../queries/Article";
import {
  routeChangeAction,
  setNavcolorOverrideAction,
} from "../../../lib/Module";
import withLoading from "../../../lib/with-loading";
import View from "./View";
import {
  closeModalAction,
  openModalAction,
} from "../../../../kauri-components/components/Modal/Module";

interface IState {
  app: {
    hostName: string;
    user: { id: string };
  };
}

const mapStateToProps = (
  state: IState,
  props: { id: string; version: string }
) => ({
  id: props.id,
  userId: state.app && state.app.user && state.app.user.id,
  version: props.version,
});

interface IArticleVersion {
  id: string;
  version: string;
}

export default compose(
  connect(
    mapStateToProps,
    {
      approveArticleAction,
      closeModalAction,
      openModalAction,
      rejectArticleAction,
      routeChangeAction,
      setNavcolorOverrideAction,
    }
  ),
  graphql(getArticle, {
    name: "ProposedUpdate",
    options: ({ id, version }: IArticleVersion) => ({
      variables: {
        id,
        version: parseInt(version, 10),
      },
    }),
  }),
  graphql(getArticle, {
    name: "CurrentArticle",
    options: ({ id }: IArticleVersion) => ({
      variables: {
        id,
      },
    }),
  }),
  withLoading()
)(View);
