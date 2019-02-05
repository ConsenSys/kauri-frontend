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

const mapStateToProps = () => ({});

interface IArticleVersion {
  id: string;
  version: string;
}

export default compose(
  connect(
    mapStateToProps,
    {
      approveArticleAction,
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
        // test:
        //   version && version.length <= 2 && isNaN(version) === false
        //     ? parseInt(version)
        //     : null,
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
