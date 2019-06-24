import React from "react";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import styled from "styled-components";
import { getCollection } from "../../../queries/Collection";
import withLoading from "../../../lib/with-loading";
import withApolloError from "../../../lib/with-apollo-error";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";
import { IReduxState } from "../../../lib/Module";

const mapStateToProps = (state: IReduxState) => ({
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

interface IProps {
  data: { getCollection: any };
}

const View: React.FunctionComponent<IProps> = ({ data }) => {
  if (!data.getCollection) {
    return null;
  }

  const { getCollection: collection } = data;
  const articleCount =
    collection.sections &&
    collection.sections.reduce((current: any, next: any) => {
      if (next && Array.isArray(next.resources)) {
        const articlesInSection = next.resources.filter(
          (sectionResource: any) =>
            sectionResource &&
            sectionResource.__typename.toLowerCase().includes("article")
        );
        current += articlesInSection.length;
      }
      return current;
    }, 0);

  const collectionCount =
    collection.sections &&
    collection.sections.reduce((current: any, next: any) => {
      if (next && Array.isArray(next.resources)) {
        const collectionsInSection = next.resources.filter(
          (sectionResource: any) =>
            sectionResource &&
            sectionResource.__typename.toLowerCase().includes("collection")
        );
        current += collectionsInSection.length;
      }
      return current;
    }, 0);

  const owner =
    collection.owner && collection.owner.__typename === "PublicUserDTO"
      ? {
          avatar: collection.owner.avatar,
          id: collection.owner.id || "not_found",
          type: "USER",
          username: collection.owner.username,
        }
      : collection.owner && collection.owner.__typename === "CommunityDTO"
      ? {
          avatar: collection.owner.avatar,
          id: collection.owner.id || "not_found",
          type: "COMMUNITY",
          username: collection.owner.name,
        }
      : {
          avatar: "",
          id: "",

          username: "",
        };

  return (
    <CollectionCard
      cardHeight={310}
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
      resourceType={owner.type || "USER"}
    />
  );
};

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getCollection, {
    options: ({ id }: { id: string }) => ({
      variables: {
        id,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View);
