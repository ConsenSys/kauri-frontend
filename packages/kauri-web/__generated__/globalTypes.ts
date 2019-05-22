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
  checkpointEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionIn?: (number | null)[] | null;
  authorIdEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  containsTag?: string | null;
  fullText?: string | null;
  idEquals?: string | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  latestVersion?: boolean | null;
  ownerIdEquals?: string | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  ownerIdEquals?: string | null;
  containingArticleId?: string | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  descriptionContains?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  membersIncludes?: string | null;
  nameContain?: string | null;
  dateCreatedLessThan?: any | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  email?: string | null;
  role?: CommunityPermissionInput | null;
  secret?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  version?: number | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  description?: string | null;
  name?: string | null;
  id?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
