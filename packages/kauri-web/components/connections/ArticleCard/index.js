import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getArticle } from "../../../queries/Article";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";

const mapStateToProps = state => ({
  hostName: state.app && state.app.hostName,
  isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
});

const View = ({
  isLoggedIn,
  data: { getArticle: article },
  cardHeight = 400,
}) => (
  <ArticleCard
    linkComponent={children => children}
    key={article.id + article.version}
    id={article.id}
    version={article.version}
    content={article.content}
    date={article.datePublished}
    title={article.title}
    username={article.owner && article.owner.username}
    userAvatar={article.owner && article.owner.avatar}
    userId={article.owner && article.owner.id}
    imageURL={article.attributes && article.attributes.background}
    cardHeight={420}
    isLoggedIn={isLoggedIn}
  />
);

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getArticle, {
    options: ({ id, version }) => ({
      variables: {
        id,
        version,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
