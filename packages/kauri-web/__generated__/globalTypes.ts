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
  idEquals?: string | null;
  checkpointEquals?: string | null;
  dateCreatedLessThan?: any | null;
  ownerEquals?: string | null;
  ownerIdEquals?: string | null;
  versionIn?: (number | null)[] | null;
  fullText?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  authorIdEquals?: string | null;
  latestVersion?: boolean | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  containingArticleId?: string | null;
  descriptionContains?: string | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
  fullText?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedGreaterThan?: any | null;
  nameContain?: string | null;
  dateCreatedLessThan?: any | null;
  membersIncludes?: string | null;
  nameContains?: string | null;
  fullText?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SectionDTOInput {
  description?: string | null;
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
