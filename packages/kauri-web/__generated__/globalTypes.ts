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
  INVITATION = "INVITATION",
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
  authorIdEquals?: string | null;
  fullText?: string | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  containsTag?: string | null;
  dateCreatedLessThan?: any | null;
  ownerIdIn?: (string | null)[] | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  latestVersion?: boolean | null;
  idEquals?: string | null;
  versionGreaterThan?: number | null;
}

export interface CollectionFilterInput {
  dateUpdatedLessThan?: any | null;
  fullText?: string | null;
  nameContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  ownerIdEquals?: string | null;
}

export interface CommunityFilterInput {
  nameContain?: string | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  dateCreatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  version?: number | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
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
