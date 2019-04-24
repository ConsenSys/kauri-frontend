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
  latestVersion?: boolean | null;
  authorIdEquals?: string | null;
  ownerIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionIn?: (number | null)[] | null;
  fullText?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  ownerEquals?: string | null;
  dateCreatedLessThan?: any | null;
  versionGreaterThan?: number | null;
  containsTag?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  nameContain?: string | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustNotIncludeUserId?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
  id?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
