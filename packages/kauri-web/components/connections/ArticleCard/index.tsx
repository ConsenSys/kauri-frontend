import React from "react";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { getArticle } from "../../../queries/Article";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import { IReduxState } from "../../../lib/Module";

const mapStateToProps = (state: IReduxState) => ({
  hostName: state.app && state.app.hostName,
  isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
});

interface IProps {
  isLoggedIn: boolean;
  data: { getArticle: any };
}

const View: React.FunctionComponent<IProps> = ({
  isLoggedIn,
  data: { getArticle: article },
}) => (
  <ArticleCard
    cardHeight={310}
    resourceType={
      getArticle.owner &&
      getArticle.owner.__typename.split("DTO")[0].toLowerCase()
    }
    linkComponent={children => children}
    key={article.id + article.version}
    id={article.id}
    version={article.version}
    description={article.description}
    date={article.datePublished}
    title={article.title}
    username={article.owner && article.owner.username}
    userAvatar={article.owner && article.owner.avatar}
    userId={article.owner && article.owner.id}
    imageURL={article.attributes && article.attributes.background}
    isLoggedIn={isLoggedIn}
  />
);

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getArticle, {
    options: ({ id, version }: any) => ({
      variables: {
        id,
        version,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
