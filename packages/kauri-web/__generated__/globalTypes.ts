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
  versionIn?: (number | null)[] | null;
  containsTag?: string | null;
  versionGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  checkpointEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  authorIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  idEquals?: string | null;
  fullText?: string | null;
}

export interface CollectionFilterInput {
  fullText?: string | null;
  containingArticleId?: string | null;
  descriptionContains?: string | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
}

export interface CommunityFilterInput {
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  membersIncludes?: string | null;
  nameContain?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustIncludeUserId?: (string | null)[] | null;
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
