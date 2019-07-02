import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import { getArticle, relatedArticles } from "../../../queries/Article";
// import { addCommentAction } from "../AddCommentForm/Module";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import { voteAction } from "./Module";
import View from "./View";
import { IReduxState, routeChangeAction } from "../../../lib/Module";
import {
  closeModalAction,
  openModalAction,
} from "../../../../kauri-components/components/Modal/Module";

const mapStateToProps = (state: IReduxState) => ({
  hostName: state.app && state.app.hostName,
  personalUsername: state.app && state.app.user && state.app.user.username,
  userId: state.app && state.app.user && state.app.user.id,
});

export default compose(
  connect(
    mapStateToProps,
    {
      closeModalAction,
      openModalAction,
      routeChangeAction,
      voteAction,
    }
  ),
  graphql(getArticle, {
    name: "data",
    options: ({ id }: { id: string }) => ({
      variables: {
        id,
      },
    }),
  }),
  graphql(relatedArticles, {
    name: "RelatedArticles",
    options: ({ id }: { id: string }) => ({
      variables: {
        filter: {
          type: "ARTICLE",
        },
        page: 0,
        resourceId: {
          id,
          type: "ARTICLE",
        },
        size: 2,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
