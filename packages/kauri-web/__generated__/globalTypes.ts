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
<<<<<<< HEAD
  authorIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  ownerIdIn?: (string | null)[] | null;
  idEquals?: string | null;
  containsTag?: string | null;
  versionIn?: (number | null)[] | null;
  versionGreaterThan?: number | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  dateUpdatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  resourcesCountGreaterThan?: number | null;
}

export interface CommunityFilterInput {
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  fullText?: string | null;
  nameContains?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
=======
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  latestVersion?: boolean | null;
  authorIdEquals?: string | null;
  checkpointEquals?: string | null;
  versionGreaterThan?: number | null;
  versionIn?: (number | null)[] | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  containsTag?: string | null;
  idEquals?: string | null;
  ownerIdEquals?: string | null;
}

export interface CollectionFilterInput {
  dateCreatedLessThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  nameContain?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  fullText?: string | null;
  nameContains?: string | null;
  dateCreatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
>>>>>>> resend invitation epic
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityResourceFilterInput {
  resourceTypeEquals?: ResourceTypeInput | null;
  statusEquals?: CommunityResourceStatusInput | null;
}

export interface InvitationInput {
<<<<<<< HEAD
  secret?: string | null;
  role?: CommunityPermissionInput | null;
  email?: string | null;
=======
  role?: CommunityPermissionInput | null;
  email?: string | null;
  secret?: string | null;
>>>>>>> resend invitation epic
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
<<<<<<< HEAD
  mustNotIncludeUserId?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
=======
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  mustIncludeUserId?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
>>>>>>> resend invitation epic
  dateCreatedGreaterThan?: any | null;
  mustNotContainTag?: (string | null)[] | null;
}

export interface SectionDTOInput {
  description?: string | null;
<<<<<<< HEAD
=======
  name?: string | null;
  id?: string | null;
>>>>>>> resend invitation epic
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
