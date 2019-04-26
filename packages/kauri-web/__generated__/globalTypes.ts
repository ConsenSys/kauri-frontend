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
  statusIn?: (ArticleStatusInput | null)[] | null;
  containsTag?: string | null;
  versionIn?: (number | null)[] | null;
  fullText?: string | null;
  checkpointEquals?: string | null;
  idEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  authorIdEquals?: string | null;
  latestVersion?: boolean | null;
  dateCreatedLessThan?: any | null;
  versionGreaterThan?: number | null;
}

export interface CollectionFilterInput {
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  containingArticleId?: string | null;
  resourcesCountGreaterThan?: number | null;
  ownerIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  nameContain?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  name?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
