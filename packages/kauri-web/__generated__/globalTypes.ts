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
  versionGreaterThan?: number | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdIn?: (string | null)[] | null;
  containsTag?: string | null;
  idEquals?: string | null;
  versionIn?: (number | null)[] | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  containingArticleId?: string | null;
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  descriptionContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContains?: string | null;
  nameContain?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
}

export interface SectionDTOInput {
  name?: string | null;
  id?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
