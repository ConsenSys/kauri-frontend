/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getUserCollections
// ====================================================

export interface getUserCollections_searchCollections_content_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getUserCollections_searchCollections_content_sections_resources_ArticleDTO_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getUserCollections_searchCollections_content_sections_resources_ArticleDTO_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface getUserCollections_searchCollections_content_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  author: getUserCollections_searchCollections_content_sections_resources_ArticleDTO_author | null;
  status: ArticleStatus | null;
  attributes: any | null;
  vote: getUserCollections_searchCollections_content_sections_resources_ArticleDTO_vote | null;
}

export type getUserCollections_searchCollections_content_sections_resources = getUserCollections_searchCollections_content_sections_resources_CommunityDTO | getUserCollections_searchCollections_content_sections_resources_ArticleDTO;

export interface getUserCollections_searchCollections_content_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  resources: (getUserCollections_searchCollections_content_sections_resources | null)[] | null;
}

export interface getUserCollections_searchCollections_content {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  sections: (getUserCollections_searchCollections_content_sections | null)[] | null;
}

export interface getUserCollections_searchCollections {
  __typename: "ResponsePage_CollectionDTO";
  content: (getUserCollections_searchCollections_content | null)[] | null;
}

export interface getUserCollections {
  searchCollections: getUserCollections_searchCollections | null;
}

export interface getUserCollectionsVariables {
  userId?: string | null;
}
