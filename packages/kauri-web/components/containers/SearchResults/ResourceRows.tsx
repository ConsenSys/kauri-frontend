import React from "react";
import styled from "../../../lib/styled-components";
import { IElementsBreakdown } from "../../../../kauri-components/components/Search/QuickSearch";
import ResourceRowWithImage from "../../../../kauri-components/components/SearchResults/ResourceRowWithImage";
import {
  searchResultsAutocomplete_searchAutocomplete_content,
  searchResultsAutocomplete_searchAutocomplete_content_resource_ArticleDTO,
  searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO,
  searchResultsAutocomplete_searchAutocomplete_content_resource_CommunityDTO,
  searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO,
  searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO,
} from "../../../queries/__generated__/searchResultsAutocomplete";
import { Link } from "../../../routes";

const ResourceSection = styled.section`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
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

interface IProps {
  totalElementsBreakdown: IElementsBreakdown;
  loading: boolean;
  viewedSearchCategory: string | null | undefined;
  setSearchCategory: (viewedSearchCategory: string) => void;
}

interface ISearchResultsAutocompleteData {
  data?: {
    searchAutocomplete: {
      content: searchResultsAutocomplete_searchAutocomplete_content[];
    };
  };
}

class ResourceRows extends React.Component<
  IProps & ISearchResultsAutocompleteData
> {
  render() {
    console.log(this.props.data);
    return Object.values(this.props.totalElementsBreakdown).filter(
      amount => amount > 0
    ).length ? (
      <ResourceSection>
        {this.props.data &&
          this.props.data.searchAutocomplete &&
          Array.isArray(
            this.props.data && this.props.data.searchAutocomplete.content
          ) &&
          this.props.data.searchAutocomplete.content
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
                        description,
                        datePublished,
                        tags,
                        owner,
                        attributes,
                        __typename,
                      } = resource.resource;

                      const typedOwner = owner as
                        | searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO
                        | searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO;
                      return (
                        <ResourceRowWithImage
                          resourceType={__typename
                            .split("DTO")[0]
                            .toLowerCase()}
                          key={String(id)}
                          id={String(id)}
                          version={Number(version)}
                          date={datePublished}
                          title={String(title)}
                          description={description}
                          userId={(typedOwner && String(typedOwner.id)) || ""}
                          ownerType={
                            typedOwner.resourceIdentifier
                              ? String(
                                  typedOwner.resourceIdentifier.type || "USER"
                                )
                              : "USER"
                          }
                          username={
                            typedOwner.__typename === "PublicUserDTO"
                              ? typedOwner.username
                              : typedOwner.name
                          }
                          userAvatar={typedOwner && typedOwner.avatar}
                          imageURL={attributes && attributes.background}
                          tags={isArticleTags(tags) ? tags : []}
                          linkComponent={(childrenProps, route) => {
                            return (
                              <Link
                                toSlug={
                                  route && route.includes("article") && title
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
                        __typename,
                      } = resource.resource;

                      const typedOwner = owner as
                        | searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner_PublicUserDTO
                        | searchResultsAutocomplete_searchAutocomplete_content_resource_CollectionDTO_owner_CommunityDTO;
                      return (
                        <ResourceRowWithImage
                          resourceType={__typename
                            .split("DTO")[0]
                            .toLowerCase()}
                          key={String(id)}
                          id={String(id)}
                          date={dateUpdated}
                          title={String(name)}
                          description={String(description)}
                          userId={(typedOwner && String(typedOwner.id)) || ""}
                          username={
                            typedOwner.__typename === "PublicUserDTO"
                              ? typedOwner.username
                              : typedOwner.name
                          }
                          ownerType={
                            typedOwner.resourceIdentifier
                              ? String(
                                  typedOwner.resourceIdentifier.type || "USER"
                                )
                              : "USER"
                          }
                          userAvatar={typedOwner && typedOwner.avatar}
                          imageURL={background}
                          tags={isArticleTags(tags) ? tags : []}
                          linkComponent={(childrenProps, route) => {
                            return (
                              <Link
                                toSlug={
                                  route && route.includes("collection") && name
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
                        __typename,
                      } = resource.resource;

                      return (
                        <ResourceRowWithImage
                          resourceType={__typename
                            .split("DTO")[0]
                            .toLowerCase()}
                          key={String(id)}
                          id={String(id)}
                          ownerType={"COMMUNITY"}
                          date={dateUpdated}
                          title={String(name)}
                          description={String(description)}
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
    ) : null;
  }
}

export default ResourceRows;
