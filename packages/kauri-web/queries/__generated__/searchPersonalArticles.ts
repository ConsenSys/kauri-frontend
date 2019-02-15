/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceType, ArticleStatus } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchPersonalArticles
// ====================================================

export interface searchPersonalArticles_searchArticles_content_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface searchPersonalArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface searchPersonalArticles_searchArticles_content_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
}

export interface searchPersonalArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchPersonalArticles_searchArticles_content_owner_ArticleDTO {
  __typename:
    | "ArticleDTO"
    | "CommentDTO"
    | "CommunityMemberDTO"
    | "TemplateDTO"
    | "CuratedListDTO"
    | "CollectionDTO"
    | "SearchResultDTO"
    | "UserDTO";
}

export interface searchPersonalArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchPersonalArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchPersonalArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface searchPersonalArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchPersonalArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchPersonalArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier | null;
}

export type searchPersonalArticles_searchArticles_content_owner =
  | searchPersonalArticles_searchArticles_content_owner_ArticleDTO
  | searchPersonalArticles_searchArticles_content_owner_PublicUserDTO
  | searchPersonalArticles_searchArticles_content_owner_CommunityDTO;

export interface searchPersonalArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchPersonalArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  author: searchPersonalArticles_searchArticles_content_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface searchPersonalArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content:
    | (searchPersonalArticles_searchArticles_content_comments_content | null)[]
    | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchPersonalArticles_searchArticles_content {
  __typename: "ArticleDTO";
  associatedNfts:
    | (searchPersonalArticles_searchArticles_content_associatedNfts | null)[]
    | null;
  resourceIdentifier: searchPersonalArticles_searchArticles_content_resourceIdentifier | null;
  description: string | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  voteResult: searchPersonalArticles_searchArticles_content_voteResult | null;
  author: searchPersonalArticles_searchArticles_content_author | null;
  owner: searchPersonalArticles_searchArticles_content_owner | null;
  comments: searchPersonalArticles_searchArticles_content_comments | null;
  updateComment: string | null;
}

export interface searchPersonalArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  totalElements: any | null;
  isLast: boolean | null;
  content: (searchPersonalArticles_searchArticles_content | null)[] | null;
  totalPages: number | null;
}

export interface searchPersonalArticles {
  searchArticles: searchPersonalArticles_searchArticles | null;
}

export interface searchPersonalArticlesVariables {
  userId?: string | null;
  size?: number | null;
  page?: number | null;
}
