/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Article
// ====================================================

export interface Article_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface Article_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Article_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface Article_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface Article_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: Article_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface Article_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface Article_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: Article_owner_CommunityDTO_resourceIdentifier | null;
}

export type Article_owner = Article_owner_ArticleDTO | Article_owner_PublicUserDTO | Article_owner_CommunityDTO;

export interface Article_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Article_comments_content {
  __typename: "CommentDTO";
  author: Article_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface Article_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (Article_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface Article_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface Article {
  __typename: "ArticleDTO";
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
  vote: Article_vote | null;
  author: Article_author | null;
  owner: Article_owner | null;
  comments: Article_comments | null;
  resourceIdentifier: Article_resourceIdentifier | null;
}