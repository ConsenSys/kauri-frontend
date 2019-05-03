import CollectionCreated from "./View";
import { routeChangeAction } from "../../../lib/Module";
import { connect } from "react-redux";
import { compose, graphql } from "react-apollo";
import withLoading from "../../../lib/with-loading";
import { getCommunity as getCommunityQuery } from "../../../queries/Community";
import {
  getCommunityVariables,
  getCommunity_getCommunity,
} from "../../../queries/__generated__/getCommunity";

const mapStateToProps = () => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql<getCommunity_getCommunity, getCommunityVariables>(getCommunityQuery, {
    options: ({ id }) => ({ variables: { id } }),
  }),
  withLoading()
)(CollectionCreated);
