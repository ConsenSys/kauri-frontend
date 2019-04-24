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
  authorIdEquals?: string | null;
  ownerEquals?: string | null;
  versionGreaterThan?: number | null;
  ownerIdEquals?: string | null;
  containsTag?: string | null;
  dateCreatedGreaterThan?: any | null;
  versionIn?: (number | null)[] | null;
  latestVersion?: boolean | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  checkpointEquals?: string | null;
}

export interface CollectionFilterInput {
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  descriptionContains?: string | null;
  fullText?: string | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  nameContain?: string | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  version?: number | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotIncludeUserId?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
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
