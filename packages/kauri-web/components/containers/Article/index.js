import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import {
  tipArticleAction,
  approveArticleAction,
  rejectArticleAction,
} from './Module';
import { deleteDraftArticleAction } from './DeleteDraftArticleModule';
import { publishArticleAction } from './Article_Module.bs';
import { getArticle } from '../../../queries/Article';
import {
  toggleModalAction,
  routeChangeAction,
  setNavcolorOverrideAction,
} from '../../../lib/Module';
import { addCommentAction } from '../AddCommentForm/Module';
import withLoading from '../../../lib/with-loading';
import withApolloError from '../../../lib/with-apollo-error';
import { addToBountyAction } from '../Requests/Module';
import {
  closeModalAction,
  openModalAction,
} from '../../../../kauri-components/components/Modal/Module';
import View from './View';

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
      toggleModalAction,
      approveArticleAction,
      rejectArticleAction,
      routeChangeAction,
      addToBountyAction,
      tipArticleAction,
      addCommentAction,
      publishArticleAction,
      openModalAction,
      closeModalAction,
      setNavcolorOverrideAction,
      deleteDraftArticleAction,
    }
  ),
  graphql(getArticle, {
    options: ({ id, version }) => ({
      variables: {
        id,
        version: parseInt(version),
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
