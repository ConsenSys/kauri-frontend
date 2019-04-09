/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleStatus {
  CANCELLED = "CANCELLED",
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  PENDING_TRANSFER = "PENDING_TRANSFER",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
}

export enum CommunityPermission {
  ADMIN = "ADMIN",
  CURATOR = "CURATOR",
}

export enum CommunityStatus {
  CLOSED = "CLOSED",
  CREATED = "CREATED",
  OPENED = "OPENED",
}

export enum Direction {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ResourceType {
  ARTICLE = "ARTICLE",
  COLLECTION = "COLLECTION",
  COMMENT = "COMMENT",
  COMMUNITY = "COMMUNITY",
  CURATED_LIST = "CURATED_LIST",
  REQUEST = "REQUEST",
  TEMPLATE = "TEMPLATE",
  USER = "USER",
}

export enum UserStatus {
  CREATED = "CREATED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  NOT_REGISTERED = "NOT_REGISTERED",
}

export interface ArticleFilterInput {
  fullText?: string | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  statusIn?: (ArticleStatus | null)[] | null;
  versionGreaterThan?: number | null;
  latestVersion?: boolean | null;
  authorIdEquals?: string | null;
  ownerEquals?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  idEquals?: string | null;
  containsTag?: string | null;
}

export interface CollectionFilterInput {
  containingArticleId?: string | null;
  descriptionContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContain?: string | null;
  membersIncludes?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceType | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceType | null;
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
