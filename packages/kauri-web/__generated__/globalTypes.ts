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
  dateCreatedLessThan?: any | null;
  authorIdEquals?: string | null;
  containsTag?: string | null;
  idEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  latestVersion?: boolean | null;
  versionGreaterThan?: number | null;
  checkpointEquals?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
}

export interface CollectionFilterInput {
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  descriptionContains?: string | null;
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  membersIncludes?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  nameContain?: string | null;
  dateUpdatedLessThan?: any | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  type?: ResourceTypeInput | null;
  id?: string | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  id?: string | null;
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
