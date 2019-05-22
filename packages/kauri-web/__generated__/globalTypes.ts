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
  containsTag?: string | null;
  ownerIdIn?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  idEquals?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  checkpointEquals?: string | null;
  latestVersion?: boolean | null;
  versionGreaterThan?: number | null;
  authorIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  fullText?: string | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  resourcesCountGreaterThan?: number | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  containingArticleId?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedLessThan?: any | null;
  fullText?: string | null;
  membersIncludes?: string | null;
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  secret?: string | null;
  role?: CommunityPermissionInput | null;
  email?: string | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  type?: ResourceTypeInput | null;
  id?: string | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustNotContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  name?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
