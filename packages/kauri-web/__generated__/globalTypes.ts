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
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  latestVersion?: boolean | null;
  dateCreatedLessThan?: any | null;
  idEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionGreaterThan?: number | null;
  containsTag?: string | null;
  authorIdEquals?: string | null;
}

export interface CollectionFilterInput {
  resourcesCountGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  descriptionContains?: string | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  nameContain?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContains?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  version?: number | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  description?: string | null;
  id?: string | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
