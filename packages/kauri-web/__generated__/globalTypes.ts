/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleStatusInput {
  CANCELLED = "CANCELLED",
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  PENDING_TRANSFER = "PENDING_TRANSFER",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
}

export enum CommunityPermissionInput {
  ADMIN = "ADMIN",
  CURATOR = "CURATOR",
}

export enum CommunityStatusInput {
  CLOSED = "CLOSED",
  CREATED = "CREATED",
  OPENED = "OPENED",
}

export enum DirectionInput {
  ASC = "ASC",
  DESC = "DESC",
}

export type ResourceTypeInput =  "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "INVITATION" | "REQUEST" | "TEMPLATE" | "USER"

export enum UserStatusInput {
  CREATED = "CREATED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  NOT_REGISTERED = "NOT_REGISTERED",
}

export interface ArticleFilterInput {
  versionIn?: (number | null)[] | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  versionGreaterThan?: number | null;
  checkpointEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  idEquals?: string | null;
  containsTag?: string | null;
  authorIdEquals?: string | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
}

export interface CollectionFilterInput {
  nameContains?: string | null;
  ownerIdEquals?: string | null;
  containingArticleId?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  fullText?: string | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  fullText?: string | null;
  nameContains?: string | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotIncludeUserId?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustNotContainTag?: (string | null)[] | null;
}

export interface SectionDTOInput {
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
