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
  containsTag?: string | null;
  versionGreaterThan?: number | null;
  authorIdEquals?: string | null;
  latestVersion?: boolean | null;
  ownerIdIn?: (string | null)[] | null;
  idEquals?: string | null;
  fullText?: string | null;
  versionIn?: (number | null)[] | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
}

export interface CollectionFilterInput {
  containingArticleId?: string | null;
  fullText?: string | null;
  ownerIdEquals?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
  descriptionContains?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedGreaterThan?: any | null;
  fullText?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  membersIncludes?: string | null;
  dateCreatedGreaterThan?: any | null;
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
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
}

export interface SectionDTOInput {
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
