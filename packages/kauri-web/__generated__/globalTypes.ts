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
  versionGreaterThan?: number | null;
  latestVersion?: boolean | null;
  dateCreatedGreaterThan?: any | null;
  authorIdEquals?: string | null;
  ownerIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  fullText?: string | null;
  containsTag?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdIn?: (string | null)[] | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
  ownerIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  containingArticleId?: string | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  nameContain?: string | null;
  dateUpdatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  role?: CommunityPermissionInput | null;
  email?: string | null;
  secret?: string | null;
}

export interface ResourceIdentifierInput {
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
  id?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
