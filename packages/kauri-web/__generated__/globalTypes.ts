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

export enum ResourceTypeInput {
  ARTICLE = "ARTICLE",
  COLLECTION = "COLLECTION",
  COMMENT = "COMMENT",
  COMMUNITY = "COMMUNITY",
  CURATED_LIST = "CURATED_LIST",
  REQUEST = "REQUEST",
  TEMPLATE = "TEMPLATE",
  USER = "USER",
}

export enum UserStatusInput {
  CREATED = "CREATED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  NOT_REGISTERED = "NOT_REGISTERED",
}

export interface ArticleFilterInput {
  idEquals?: string | null;
  ownerEquals?: string | null;
  containsTag?: string | null;
  fullText?: string | null;
  checkpointEquals?: string | null;
  ownerIdEquals?: string | null;
  versionGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  versionIn?: (number | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  authorIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  latestVersion?: boolean | null;
}

export interface CollectionFilterInput {
  nameContains?: string | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  containingArticleId?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  descriptionContains?: string | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  membersIncludes?: string | null;
  fullText?: string | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  id?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
