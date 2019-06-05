import { compose, graphql } from "react-apollo";
import { connect } from "react-redux";
import {
  tipArticleAction,
  approveArticleAction,
  rejectArticleAction,
} from "./Module";
import { deleteDraftArticleAction } from "../ArticleDraft/DeleteDraftArticleModule";
import { publishArticleAction } from "../SubmitArticleForm/PublishArticleModule";
import { getArticle, relatedArticles } from "../../../queries/Article";
import { toggleModalAction, routeChangeAction } from "../../../lib/Module";
import { addCommentAction } from "../AddCommentForm/Module";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import { voteAction } from "./ApprovedArticle/VoteModule";
import {
  closeModalAction,
  openModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import { approveResourceAction } from "../Community/Module";
import View from "./View";

const mapStateToProps = (state, ownProps) => ({
  ethUsdPrice: state.app.ethUsdPrice,
  topics: state.app && state.app.user && state.app.user.topics,
  userId: state.app && state.app.user && state.app.user.id,
  personalUsername: state.app && state.app.user && state.app.user.username,
  hostName: state.app && state.app.hostName,
});

export default compose(
  connect(
    mapStateToProps,
    {
      voteAction,
      toggleModalAction,
      approveArticleAction,
      rejectArticleAction,
      routeChangeAction,
      tipArticleAction,
      addCommentAction,
      publishArticleAction,
      approveResourceAction,
      openModalAction,
      closeModalAction,
      deleteDraftArticleAction,
    }
  ),
  graphql(getArticle, {
    name: "data",
    options: ({ id, version }) => ({
      variables: {
        id,
        version: parseInt(version),
        test:
          version && version.length <= 2 && isNaN(version) === false
            ? parseInt(version)
            : null,
      },
    }),
  }),
  graphql(relatedArticles, {
    name: "RelatedArticles",
    options: ({ id }) => ({
      variables: {
        size: 3,
        page: 0,
        filter: {
          type: "ARTICLE",
        },
        resourceId: {
          id,
          type: "ARTICLE",
        },
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
