/* tslint:disable */
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
  authorIdEquals?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  ownerEquals?: string | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  containsTag?: string | null;
  dateCreatedLessThan?: any | null;
  idEquals?: string | null;
  versionGreaterThan?: number | null;
}

export interface CollectionFilterInput {
  nameContains?: string | null;
  fullText?: string | null;
  descriptionContains?: string | null;
  ownerIdEquals?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  containingArticleId?: string | null;
}

export interface CommunityFilterInput {
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  membersIncludes?: string | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  nameContain?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
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
