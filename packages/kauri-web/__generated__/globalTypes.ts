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

export enum CommunityResourceStatusInput {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
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
  latestVersion?: boolean | null;
  containsTag?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  fullText?: string | null;
  ownerIdIn?: (string | null)[] | null;
  ownerIdEquals?: string | null;
  versionIn?: (number | null)[] | null;
  authorIdEquals?: string | null;
  versionGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  checkpointEquals?: string | null;
  idEquals?: string | null;
}

export interface CollectionFilterInput {
  dateUpdatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContain?: string | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  version?: number | null;
  id?: string | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
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
