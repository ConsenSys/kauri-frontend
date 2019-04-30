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
  authorIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  latestVersion?: boolean | null;
  checkpointEquals?: string | null;
  versionIn?: (number | null)[] | null;
  fullText?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  idEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  versionGreaterThan?: number | null;
  containsTag?: string | null;
}

export interface CollectionFilterInput {
  ownerIdEquals?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  fullText?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  containingArticleId?: string | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  nameContain?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  version?: number | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
