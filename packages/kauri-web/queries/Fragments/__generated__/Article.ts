/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ResourceTypeInput, ArticleStatusInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: Article
// ====================================================

export interface Article_associatedNfts {
  __typename: "NftTokenDTO";
  tokenType: string | null;
  contractAddress: string | null;
  name: string | null;
  image: string | null;
  externalUrl: string | null;
}

export interface Article_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface Article_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
  count: any | null;
  hasVoted: boolean | null;
  quantity: any | null;
}

export interface Article_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface Article_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityInvitationDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface Article_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
}

export interface Article_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  resourceIdentifier: Article_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface Article_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
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
  totalPages: number;
  totalElements: any;
}

export interface Article {
  __typename: "ArticleDTO";
  associatedNfts: (Article_associatedNfts | null)[] | null;
  resourceIdentifier: Article_resourceIdentifier | null;
  description: string | null;
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  tags: (string | null)[] | null;
  voteResult: Article_voteResult | null;
  author: Article_author | null;
  owner: Article_owner | null;
  comments: Article_comments | null;
  updateComment: string | null;
}
