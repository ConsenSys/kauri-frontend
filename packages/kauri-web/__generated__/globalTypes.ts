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
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  latestVersion?: boolean | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  ownerIdIn?: (string | null)[] | null;
  checkpointEquals?: string | null;
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  containsTag?: string | null;
  idEquals?: string | null;
  versionIn?: (number | null)[] | null;
  authorIdEquals?: string | null;
  versionGreaterThan?: number | null;
}

export interface CollectionFilterInput {
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  containingArticleId?: string | null;
  ownerIdEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContains?: string | null;
  membersIncludes?: string | null;
}

export interface CommunityResourceFilterInput {
  resourceTypeEquals?: ResourceTypeInput | null;
  statusEquals?: CommunityResourceStatusInput | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  version?: number | null;
  id?: string | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
}

export interface SectionDTOInput {
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
