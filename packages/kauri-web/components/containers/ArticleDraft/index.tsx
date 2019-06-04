import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { deleteDraftArticleAction } from "./DeleteDraftArticleModule";
import { publishArticleAction } from "../SubmitArticleForm/PublishArticleModule";
import { getArticle } from "../../../queries/Article";
import { routeChangeAction, IReduxState } from "../../../lib/Module";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import View from "./View";

const mapStateToProps = (state: IReduxState) => ({
  hostName: state.app && state.app.hostName,
  personalUsername: state.app && state.app.user && state.app.user.username,
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {
      deleteDraftArticleAction,
      publishArticleAction,
      routeChangeAction,
    }
  ),
  graphql(getArticle, {
    name: "data",
    options: ({ id, version }: { id: string; version: string }) => {
      const versionInt = parseInt(version, 10);
      return {
        variables: {
          id,
          test:
            version && version.length <= 2 && isNaN(versionInt) === false
              ? versionInt
              : null,
          version: versionInt,
        },
      };
    },
  }),
  withLoading(),
  withApolloError()
)(View);
