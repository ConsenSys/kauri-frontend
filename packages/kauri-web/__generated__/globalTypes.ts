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

export enum ArticleStatusInput {
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

export enum ResourceType {
  ARTICLE = "ARTICLE",
  COLLECTION = "COLLECTION",
  COMMENT = "COMMENT",
  COMMUNITY = "COMMUNITY",
  CURATED_LIST = "CURATED_LIST",
  REQUEST = "REQUEST",
  USER = "USER",
}

export enum ResourceTypeInput {
  ARTICLE = "ARTICLE",
  COLLECTION = "COLLECTION",
  COMMENT = "COMMENT",
  COMMUNITY = "COMMUNITY",
  CURATED_LIST = "CURATED_LIST",
  REQUEST = "REQUEST",
  USER = "USER",
}

export interface ArticleFilterInput {
  dateCreatedGreaterThan?: any | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  authorIdEquals?: string | null;
  latestVersion?: boolean | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  idEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  ownerEquals?: string | null;
  checkpointEquals?: string | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  descriptionContains?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  containingArticleId?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  nameContain?: string | null;
  membersIncludes?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  name?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
