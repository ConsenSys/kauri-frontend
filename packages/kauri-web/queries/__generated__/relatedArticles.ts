/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceIdentifierInput, SearchFilterInput, ResourceTypeInput, ArticleStatusInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: relatedArticles
// ====================================================

export interface relatedArticles_searchMoreLikeThis_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface relatedArticles_searchMoreLikeThis_content_resource_PublicUserDTO {
  __typename: "PublicUserDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "SearchResultDTO" | "UserDTO" | "CuratedListDTO";
}

export interface relatedArticles_searchMoreLikeThis_content_resource_ArticleDTO_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface relatedArticles_searchMoreLikeThis_content_resource_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  description: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  voteResult: relatedArticles_searchMoreLikeThis_content_resource_ArticleDTO_voteResult | null;
}

export interface relatedArticles_searchMoreLikeThis_content_resource_CollectionDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  type: ResourceTypeInput | null;
  id: string | null;
}

export interface relatedArticles_searchMoreLikeThis_content_resource_CollectionDTO {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  description: string | null;
  tags: (string | null)[] | null;
  background: string | null;
  dateUpdated: any | null;
  resourceIdentifier: relatedArticles_searchMoreLikeThis_content_resource_CollectionDTO_resourceIdentifier | null;
}

export interface relatedArticles_searchMoreLikeThis_content_resource_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  dateCreated: any | null;
  dateUpdated: any | null;
  creatorId: string | null;
  name: string | null;
  description: string | null;
  website: string | null;
  avatar: string | null;
  social: any | null;
}

export type relatedArticles_searchMoreLikeThis_content_resource = relatedArticles_searchMoreLikeThis_content_resource_PublicUserDTO | relatedArticles_searchMoreLikeThis_content_resource_ArticleDTO | relatedArticles_searchMoreLikeThis_content_resource_CollectionDTO | relatedArticles_searchMoreLikeThis_content_resource_CommunityDTO;

export interface relatedArticles_searchMoreLikeThis_content {
  __typename: "SearchResultDTO";
  resourceIdentifier: relatedArticles_searchMoreLikeThis_content_resourceIdentifier | null;
  resource: relatedArticles_searchMoreLikeThis_content_resource | null;
}

export interface relatedArticles_searchMoreLikeThis {
  __typename: "ResponseBreakdownPage_SearchResultDTO";
  totalElements: any;
  totalElementsBreakdown: any | null;
  totalPages: number;
  content: (relatedArticles_searchMoreLikeThis_content | null)[] | null;
}

export interface relatedArticles {
  searchMoreLikeThis: relatedArticles_searchMoreLikeThis | null;
}

export interface relatedArticlesVariables {
  page?: number | null;
  size?: number | null;
  resourceId?: ResourceIdentifierInput | null;
  filter?: SearchFilterInput | null;
}
