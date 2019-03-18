import React from "react";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import styled from "styled-components";
import { getCollection } from "../../../queries/Collection";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";

const mapStateToProps = state => ({
  hostName: state.app && state.app.hostName,
  isLoggedIn: !!(state.app && state.app.user && state.app.user.id),
});

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    color: ${props => props.theme.colors.hoverTextColor} !important;
    > * {
      color: ${props => props.theme.colors.hoverTextColor} !important;
      > * {
        color: ${props => props.theme.colors.hoverTextColor} !important;
        > * {
          color: ${props => props.theme.colors.hoverTextColor} !important;
        }
      }
    }
  }
`;

const View = ({ isLoggedIn, data: { getCollection: collection } }) => {
  const articleCount =
    collection.sections &&
    collection.sections.reduce((current, next) => {
      if (next && Array.isArray(next.resources)) {
        const articlesInSection = next.resources.filter(
          sectionResource =>
            sectionResource &&
            sectionResource.__typename.toLowerCase().includes("article")
        );
        current += articlesInSection.length;
      }
      return current;
    }, 0);

  const collectionCount =
    collection.sections &&
    collection.sections.reduce((current, next) => {
      if (next && Array.isArray(next.resources)) {
        const collectionsInSection = next.resources.filter(
          sectionResource =>
            sectionResource &&
            sectionResource.__typename.toLowerCase().includes("collection")
        );
        current += collectionsInSection.length;
      }
      return current;
    }, 0);

  return (
    <CollectionCard
      key={collection.id}
      id={collection.id}
      articleCount={articleCount}
      collectionCount={collectionCount}
      linkComponent={children => <Link>{children}</Link>}
      description={collection.description}
      date={collection.dateUpdated}
      name={collection.name}
      userId={collection.owner && collection.owner.id}
      username={collection.owner && collection.owner.name}
      userAvatar={collection.owner && collection.owner.avatar}
      imageURL={collection.background}
    />
  );
};

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getCollection, {
    options: ({ id }) => ({
      variables: {
        id,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
