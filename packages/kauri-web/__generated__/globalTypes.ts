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
  statusIn?: (ArticleStatus | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  checkpointEquals?: string | null;
  versionIn?: (number | null)[] | null;
  authorIdEquals?: string | null;
  ownerEquals?: string | null;
  containsTag?: string | null;
  idEquals?: string | null;
  dateCreatedLessThan?: any | null;
}

export interface CollectionFilterInput {
  containingArticleId?: string | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  fullText?: string | null;
  ownerIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedGreaterThan?: any | null;
  fullText?: string | null;
  nameContains?: string | null;
  nameContain?: string | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  version?: number | null;
  type?: ResourceType | null;
}

export interface SearchFilterInput {
  type?: ResourceType | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  description?: string | null;
  id?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
