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
  fullText?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionIn?: (number | null)[] | null;
  latestVersion?: boolean | null;
  containsTag?: string | null;
  ownerIdEquals?: string | null;
  authorIdEquals?: string | null;
  versionGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  ownerEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CollectionFilterInput {
  fullText?: string | null;
  ownerIdEquals?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  containingArticleId?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  fullText?: string | null;
  nameContain?: string | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
  description?: string | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
