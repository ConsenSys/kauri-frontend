import React from "react";
import styled from "styled-components";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";
import ChooseCollectionContent, {
  Content,
} from "../../../../kauri-components/components/Modal/ChooseCollectionContent";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";
import Tabs from "../../../../kauri-components/components/Tabs";
import withPagination from "../../../lib/with-pagination";
import Loading from "../../common/Loading";

const Container = styled.div`
  display: flex;
  flex-diretion: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;

  ${Content} {
    padding-top: 10px;
  }
`;

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

const CollectionsContent = ({
  chooseCollection,
  viewCollection,
  chosenCollections,
  collections: { content },
  userId,
  setRef,
  allOtherChosenCollections,
  currentCollectionIdIfUpdating,
}) =>
  content.length > 0 ? (
    <Container>
      <ChooseCollectionContent setRef={setRef}>
        {content.map(collection => {
          // Don't show chosen Collections from other sections
          if (
            allOtherChosenCollections.find(({ resourcesId }) =>
              resourcesId.find(
                ({ id, version }) =>
                  id === collection.id ||
                  currentCollectionIdIfUpdating === collection.id
              )
            )
          ) {
            return null;
          }

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
                    sectionResource.__typename
                      .toLowerCase()
                      .includes("collection")
                );
                current += collectionsInSection.length;
              }
              return current;
            }, 0);

          return (
            <CollectionCard
              key={collection.id + collection.version}
              id={collection.id}
              description={collection.description}
              date={collection.dateUpdated}
              name={collection.name}
              userId={collection.owner && collection.owner.id}
              username={collection.owner && collection.owner.name}
              userAvatar={collection.owner && collection.owner.avatar}
              imageURL={collection.background}
              isLoggedIn={!!userId}
              articleCount={articleCount}
              collectionCount={collectionCount}
              linkComponent={children => <Link>{children}</Link>}
              hoverChildren={({ hideDispatch }) => (
                <React.Fragment>
                  <PrimaryButton
                    onClick={() => {
                      chooseCollection({
                        id: collection.id,
                        version: collection.version,
                      });
                      hideDispatch();
                    }}
                  >
                    Choose
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() =>
                      window.open(
                        `${window.location.origin}/collection/${collection.id}`,
                        "_blank"
                      )
                    }
                  >
                    View
                  </SecondaryButton>
                </React.Fragment>
              )}
              isChosenCollection={
                !!chosenCollections.find(
                  ({ id, version }) =>
                    collection.id === id && collection.version === version
                )
              }
              triggerHoverChildrenOnFullCardClick
            />
          );
        })}
      </ChooseCollectionContent>
    </Container>
  ) : (
    <p>You have no published collections!</p>
  );

const PublishedCollections = withPagination(
  CollectionsContent,
  "searchCollections",
  "searchPublishedCollections"
);
const PersonalPublishedCollections = withPagination(
  CollectionsContent,
  "searchCollections",
  "searchPersonalPublishedCollections"
);

export default props => {
  if (
    (props.searchPublishedCollections &&
      props.searchPublishedCollections.loading) ||
    (props.searchPersonalPublishedCollections &&
      props.searchPersonalPublishedCollections.loading)
  ) {
    return <Loading />;
  }

  return (
    <Tabs
      centerTabs
      tabs={[{ name: "My Collections" }, { name: "All Collections" }]}
      panels={[
        <PersonalPublishedCollections
          {...props}
          collections={
            props.searchPersonalPublishedCollections.searchCollections
          }
        />,
        <PublishedCollections
          {...props}
          collections={props.searchPublishedCollections.searchCollections}
        />,
      ]}
    />
  );
};

//   linkComponent?: (React.Node, string) => React.Node,
//   pageType?: PageType,
//   hoverAction?: { id: string, content: string } => void,
//   viewAction?: { id: string, version: string } => void,
//   isChosenArticle?: boolean,
// }
