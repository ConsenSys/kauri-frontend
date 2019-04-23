/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatusInput, ResourceTypeInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getArticle
// ====================================================

export interface getArticle_getArticle_voteResult {
  __typename: "VoteResultDTO";
  sum: number | null;
}

export interface getArticle_getArticle_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
}

export interface getArticle_getArticle_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceTypeInput | null;
  version: number | null;
}

export interface getArticle_getArticle {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatusInput | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  voteResult: getArticle_getArticle_voteResult | null;
  author: getArticle_getArticle_author | null;
  resourceIdentifier: getArticle_getArticle_resourceIdentifier | null;
}

export interface getArticle {
  getArticle: getArticle_getArticle | null;
}

export interface getArticleVariables {
  id?: string | null;
  version?: number | null;
  published?: boolean | null;
}
