/* tslint:disable */
/* eslint-disable */
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

export enum CommunityInvitationStatusInput {
  ACCEPTED = "ACCEPTED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  PENDING = "PENDING",
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
  versionGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  versionIn?: (number | null)[] | null;
  containsTag?: string | null;
  authorIdEquals?: string | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  idEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  ownerIdIn?: (string | null)[] | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
}

export interface CollectionFilterInput {
  containingArticleId?: string | null;
  dateUpdatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  ownerIdEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  nameContains?: string | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
}

export interface CommunityResourceFilterInput {
  resourceTypeEquals?: ResourceTypeInput | null;
  statusEquals?: CommunityResourceStatusInput | null;
}

export interface InvitationInput {
  secret?: string | null;
  email?: string | null;
  role?: CommunityPermissionInput | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  type?: ResourceTypeInput | null;
  id?: string | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  mustNotContainTag?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustIncludeUserId?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
}

export interface SectionDTOInput {
  name?: string | null;
  id?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
