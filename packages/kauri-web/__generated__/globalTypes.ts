/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleStatus {
  CANCELLED = "CANCELLED",
  DRAFT = "DRAFT",
  PENDING = "PENDING",
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
  latestVersion?: boolean | null;
  ownerEquals?: string | null;
  containsTag?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  authorIdEquals?: string | null;
  ownerIdEquals?: string | null;
  statusIn?: (ArticleStatus | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  versionIn?: (number | null)[] | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  resourcesCountGreaterThan?: number | null;
}

export interface CommunityFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  nameContain?: string | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceType | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceType | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
}

export interface SectionDTOInput {
  id?: string | null;
  description?: string | null;
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
