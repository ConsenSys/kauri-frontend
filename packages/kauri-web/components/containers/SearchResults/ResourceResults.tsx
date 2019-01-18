import React from "react";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import SearchCategory from "../../../../kauri-components/components/SearchResults/SearchCategory";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import ResourceRowWithImage from "../../../../kauri-components/components/SearchResults/ResourceRowWithImage";
import { Title2 } from "../../../../kauri-components/components/Typography";
import Empty from "../PublicProfile/Empty";
import Loading from "../../common/Loading";
import {
  searchResultsAutocomplete_searchAutocomplete_content,
  searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO,
  searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO,
  searchResultsAutocomplete_searchAutocomplete_content_resource_CommunityDTO,
} from "../../../queries/__generated__/searchResultsAutocomplete";
import { Link } from "../../../routes";

const CategorySection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const ResourceSection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const CenterContent = styled.div`
  display: flex;
  min-width: 1280px;
  justify-content: center;
`;

const isArticleResource = (
  resource: any
): resource is searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO =>
  resource !== "undefined";

const isCollectionResource = (
  resource: any
): resource is searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO =>
  resource !== "undefined";

const isCommunityResource = (
  resource: any
): resource is searchResultsAutocomplete_searchAutocomplete_content_resource_CommunityDTO =>
  resource !== "undefined";

const isArticleTags = (tags: any): tags is string[] => Array.isArray(tags);

const searchCategories = ["ARTICLE", "COLLECTION", "COMMUNITY"];

interface IProps {
  totalElementsBreakdown: IElementsBreakdown;
  loading: boolean;
  results: searchResultsAutocomplete_searchAutocomplete_content[];
  viewedSearchCategory: string;
  setSearchCategory: (viewedSearchCategory: string) => void;
}

class ResourceResults extends React.Component<IProps> {
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <ContentSection gridAutoFlow={["", "column"]}>
        <CategorySection>
          {Object.keys(this.props.totalElementsBreakdown).filter(
            category =>
              this.props.totalElementsBreakdown[category] > 0 &&
              searchCategories.includes(category)
          ).length ? (
            Object.keys(this.props.totalElementsBreakdown)
              .filter(
                category =>
                  searchCategories.includes(category) &&
                  this.props.totalElementsBreakdown[category] > 0
              )
              .sort()
              .map(category => (
                <SearchCategory
                  key={category}
                  onClick={() => this.props.setSearchCategory(category)}
                  active={category === this.props.viewedSearchCategory}
                  category={category}
                  amount={this.props.totalElementsBreakdown[category]}
                />
              ))
          ) : (
            <CenterContent>
              <Empty>
                <Title2>No Results found! :(</Title2>
              </Empty>
            </CenterContent>
          )}
        </CategorySection>
        {Object.values(this.props.totalElementsBreakdown).filter(
          amount => amount > 0
        ).length ? (
          <ResourceSection>
            {Array.isArray(this.props.results) &&
              this.props.results
                .filter(
                  resource =>
                    resource.resourceIdentifier &&
                    resource.resourceIdentifier.type ===
                      this.props.viewedSearchCategory
                )
                .map(resource => {
                  if (resource) {
                    switch (
                      resource.resourceIdentifier &&
                        resource.resourceIdentifier.type
                    ) {
                      case "ARTICLE":
                        if (isArticleResource(resource.resource)) {
                          const {
                            id,
                            version,
                            title,
                            content,
                            datePublished,
                            tags,
                            author,
                            attributes,
                          } = resource.resource;
                          return (
                            <ResourceRowWithImage
                              key={String(id)}
                              id={String(id)}
                              resourceType={"USER"}
                              version={Number(version)}
                              date={datePublished}
                              title={String(title)}
                              content={String(content)}
                              userId={(author && String(author.id)) || ""}
                              username={author && author.username}
                              userAvatar={author && author.avatar}
                              imageURL={attributes && attributes.background}
                              tags={isArticleTags(tags) ? tags : []}
                              linkComponent={(childrenProps, route) => {
                                return (
                                  <Link
                                    toSlug={route.includes("article") && title}
                                    useAnchorTag={true}
                                    href={route}
                                  >
                                    {childrenProps}
                                  </Link>
                                );
                              }}
                            />
                          );
                        }
                      case "COLLECTION":
                        if (isCollectionResource(resource.resource)) {
                          const {
                            id,
                            name,
                            description,
                            dateUpdated,
                            tags,
                            owner,
                            background,
                          } = resource.resource;
                          return (
                            <ResourceRowWithImage
                              key={String(id)}
                              id={String(id)}
                              resourceType={"COLLECTION"}
                              date={dateUpdated}
                              title={String(name)}
                              content={String(description)}
                              userId={(owner && String(owner.id)) || ""}
                              username={owner && owner.username}
                              userAvatar={owner && owner.avatar}
                              imageURL={background}
                              tags={isArticleTags(tags) ? tags : []}
                              linkComponent={(childrenProps, route) => {
                                return (
                                  <Link
                                    toSlug={
                                      route.includes("collection") && name
                                    }
                                    useAnchorTag={true}
                                    href={route}
                                  >
                                    {childrenProps}
                                  </Link>
                                );
                              }}
                            />
                          );
                        }
                      case "COMMUNITY":
                        if (isCommunityResource(resource.resource)) {
                          const {
                            id,
                            name,
                            description,
                            dateUpdated,
                            // creatorId,
                            avatar,
                          } = resource.resource;
                          return (
                            <ResourceRowWithImage
                              key={String(id)}
                              id={String(id)}
                              resourceType={"COMMUNITY"}
                              date={dateUpdated}
                              title={String(name)}
                              content={String(description)}
                              userId={String(id)}
                              username={name}
                              userAvatar={avatar}
                              imageURL={avatar}
                              tags={[]}
                              linkComponent={(childrenProps, route) => {
                                return (
                                  <Link useAnchorTag={true} href={route}>
                                    {childrenProps}
                                  </Link>
                                );
                              }}
                            />
                          );
                        }
                      default:
                        return null;
                    }
                  }
                  return null;
                })}
          </ResourceSection>
        ) : null}
      </ContentSection>
    );
  }
}

export default ResourceResults;
