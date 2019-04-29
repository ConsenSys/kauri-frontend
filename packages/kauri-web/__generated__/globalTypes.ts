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
  fullText?: string | null;
  checkpointEquals?: string | null;
  idEquals?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  authorIdEquals?: string | null;
  latestVersion?: boolean | null;
  dateCreatedLessThan?: any | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionGreaterThan?: number | null;
  containsTag?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CollectionFilterInput {
  dateCreatedLessThan?: any | null;
  containingArticleId?: string | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContain?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  membersIncludes?: string | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
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
