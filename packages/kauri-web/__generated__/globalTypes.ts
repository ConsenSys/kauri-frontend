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
  checkpointEquals?: string | null;
  versionGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  idEquals?: string | null;
  dateCreatedLessThan?: any | null;
  authorIdEquals?: string | null;
  containsTag?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  fullText?: string | null;
  statusIn?: (ArticleStatus | null)[] | null;
  ownerEquals?: string | null;
}

export interface CollectionFilterInput {
  fullText?: string | null;
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  nameContains?: string | null;
  containingArticleId?: string | null;
}

export interface CommunityFilterInput {
  nameContains?: string | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  membersIncludes?: string | null;
  fullText?: string | null;
  dateUpdatedLessThan?: any | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceType | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  type?: ResourceType | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
}

export interface SectionDTOInput {
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
