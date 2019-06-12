import * as React from "react";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import Empty from "../PublicProfile/Empty";
import {
  Title2,
  PageDescription,
} from "../../../../kauri-components/components/Typography";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import AddToCollectionConnection from "../../connections/AddToCollection/index";
import {
  Article,
  Article_owner_PublicUserDTO,
  Article_owner_CommunityDTO,
} from "../../../queries/Fragments/__generated__/Article";
import {
  Collection,
  Collection_owner_PublicUserDTO,
} from "../../../queries/Fragments/__generated__/Collection";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const ResourcesSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

const StyledTitle = styled(Title2)`
  margin-top: ${props => props.theme.space[3]}px;
`;

const StyledDescription = styled(PageDescription)`
  margin-bottom: ${props => props.theme.space[3]}px;
`;

interface IProps {
  resources: [Article | Collection];
  currentUser: string | null;
  description: string | null;
  isLoggedIn: boolean;
  isOwnedByCurrentUser: boolean;
  name: string;
  openModalAction: any;
}

const CollectionSection: React.SFC<IProps> = props => {
  const {
    name,
    description,
    resources,
    isLoggedIn,
    openModalAction,
    isOwnedByCurrentUser,
  } = props;
  if (resources) {
    return (
      <Container>
        <StyledTitle>{name}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        <ResourcesSection>
          {resources.map(resource => {
            const owner = resource.owner as
              | Article_owner_PublicUserDTO
              | Article_owner_CommunityDTO;

            if (resource.__typename === "ArticleDTO") {
              const article = resource;
              return (
                <ArticleCard
                  key={String(article.id)}
                  id={String(article.id)}
                  version={Number(article.version)}
                  description={article.description}
                  date={article.datePublished}
                  title={String(article.title)}
                  username={
                    (owner &&
                    owner.resourceIdentifier &&
                    owner.resourceIdentifier.type &&
                    owner.resourceIdentifier.type.toLowerCase() === "community"
                      ? owner && owner.name
                      : owner &&
                        (owner as Article_owner_PublicUserDTO).username) || null
                  }
                  userId={
                    owner
                      ? typeof owner.id === "string"
                        ? owner.id
                        : "Anoymous"
                      : "Anonymous"
                  }
                  userAvatar={(owner && owner.avatar) || null}
                  nfts={article.associatedNfts}
                  tags={article.tags as string[]}
                  imageURL={
                    (article.attributes &&
                      typeof article.attributes.background === "string" &&
                      article.attributes.background) ||
                    null
                  }
                  linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                  ) => (
                    <Link
                      toSlug={
                        route && route.includes("article") && article.title
                      }
                      useAnchorTag={true}
                      href={route}
                    >
                      {childrenProps}
                    </Link>
                  )}
                  resourceType={"USER"}
                  cardHeight={420}
                  isLoggedIn={isLoggedIn}
                  hoverChildren={
                    isOwnedByCurrentUser
                      ? null
                      : () => (
                          <PrimaryButton
                            onClick={() =>
                              openModalAction({
                                children: (
                                  <AddToCollectionConnection
                                    articleId={String(article.id)}
                                    version={Number(article.version)}
                                  />
                                ),
                              })
                            }
                          >
                            Add To Collection
                          </PrimaryButton>
                        )
                  }
                />
              );
            } else if (resource.__typename === "CollectionDTO") {
              const collection = resource;
              const articleCount =
                collection.sections &&
                collection.sections.reduce((current, next) => {
                  if (next && Array.isArray(next.resources)) {
                    const articlesInSection = next.resources.filter(
                      sectionResource =>
                        sectionResource &&
                        sectionResource.__typename
                          .toLowerCase()
                          .includes("article")
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
                  key={String(collection.id)}
                  id={String(collection.id)}
                  articleCount={String(articleCount)}
                  collectionCount={String(collectionCount)}
                  description={
                    collection.description ? collection.description : ""
                  }
                  date={collection.dateUpdated}
                  name={collection.name ? collection.name : ""}
                  userId={String(
                    collection.owner &&
                      (collection.owner as Collection_owner_PublicUserDTO).id
                  )}
                  username={
                    collection.owner &&
                    (collection.owner as Collection_owner_PublicUserDTO).name
                  }
                  userAvatar={
                    collection.owner &&
                    (collection.owner as Collection_owner_PublicUserDTO).avatar
                  }
                  imageURL={collection.background}
                  linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                  ) => (
                    <Link
                      toSlug={
                        route &&
                        route.includes("collection") &&
                        collection &&
                        collection.name
                      }
                      useAnchorTag={true}
                      href={route}
                    >
                      {childrenProps}
                    </Link>
                  )}
                  cardHeight={310}
                />
              );
            }
            return null;
          })}
        </ResourcesSection>
      </Container>
    );
  }
  return <Empty />;
};

export default CollectionSection;
