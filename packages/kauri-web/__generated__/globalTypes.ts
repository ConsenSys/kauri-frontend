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
  authorIdEquals?: string | null;
  containsTag?: string | null;
  latestVersion?: boolean | null;
  versionGreaterThan?: number | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  ownerIdIn?: (string | null)[] | null;
  idEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  checkpointEquals?: string | null;
  versionIn?: (number | null)[] | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  descriptionContains?: string | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  nameContains?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  nameContain?: string | null;
  membersIncludes?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  email?: string | null;
  secret?: string | null;
  role?: CommunityPermissionInput | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  mustNotContainTag?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
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
