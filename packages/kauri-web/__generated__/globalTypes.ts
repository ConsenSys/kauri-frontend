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
  dateCreatedGreaterThan?: any | null;
  containsTag?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  authorIdEquals?: string | null;
  fullText?: string | null;
  latestVersion?: boolean | null;
  ownerIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  versionIn?: (number | null)[] | null;
  versionGreaterThan?: number | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  ownerEquals?: string | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  ownerIdEquals?: string | null;
  descriptionContains?: string | null;
  fullText?: string | null;
}

export interface CommunityFilterInput {
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  nameContain?: string | null;
  nameContains?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  mustNotContainTag?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  name?: string | null;
  description?: string | null;
  id?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
