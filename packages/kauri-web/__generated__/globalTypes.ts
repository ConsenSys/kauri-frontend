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
  dateCreatedLessThan?: any | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  authorIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionIn?: (number | null)[] | null;
  versionGreaterThan?: number | null;
  ownerIdIn?: (string | null)[] | null;
  idEquals?: string | null;
  latestVersion?: boolean | null;
  containsTag?: string | null;
  fullText?: string | null;
}

export interface CollectionFilterInput {
  containingArticleId?: string | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  fullText?: string | null;
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
  nameContain?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
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
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SectionDTOInput {
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
