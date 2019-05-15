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
  versionIn?: (number | null)[] | null;
  versionGreaterThan?: number | null;
  latestVersion?: boolean | null;
  dateCreatedGreaterThan?: any | null;
  checkpointEquals?: string | null;
  authorIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  ownerIdEquals?: string | null;
  fullText?: string | null;
  idEquals?: string | null;
  containsTag?: string | null;
  ownerIdIn?: (string | null)[] | null;
}

export interface CollectionFilterInput {
  descriptionContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
  containingArticleId?: string | null;
  nameContains?: string | null;
  fullText?: string | null;
  ownerIdEquals?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  nameContains?: string | null;
  fullText?: string | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  secret?: string | null;
  email?: string | null;
  role?: CommunityPermissionInput | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  version?: number | null;
  id?: string | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
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
