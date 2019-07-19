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

export enum ScoringModeInput {
  LAST_POSTED = "LAST_POSTED",
  LAST_UPDATED = "LAST_UPDATED",
  MOST_POPULAR = "MOST_POPULAR",
  NONE = "NONE",
  RANDOM = "RANDOM",
  TRENDING = "TRENDING",
}

export enum UserStatusInput {
  CREATED = "CREATED",
  EMAIL_VERIFIED = "EMAIL_VERIFIED",
  NOT_REGISTERED = "NOT_REGISTERED",
}

export interface ArticleFilterInput {
  ownerIdIn?: (string | null)[] | null;
  latestVersion?: boolean | null;
  idEquals?: string | null;
  containsTag?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  versionGreaterThan?: number | null;
  authorIdEquals?: string | null;
  checkpointEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  fullText?: string | null;
  ownerIdEquals?: string | null;
  versionIn?: (number | null)[] | null;
}

export interface CollectionFilterInput {
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  descriptionContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  containingArticleId?: string | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
}

export interface CommunityFilterInput {
  nameContains?: string | null;
  nameContain?: string | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  membersIncludes?: string | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityInvitationFilterInput {
  communityIdEquals?: string | null;
  deduplicateByEmail?: boolean | null;
  statusIn?: (CommunityInvitationStatusInput | null)[] | null;
  dateAddedGreaterThan?: any | null;
  dateAddedLessThan?: any | null;
}

export interface CommunityResourceFilterInput {
  resourceTypeEquals?: ResourceTypeInput | null;
  statusEquals?: CommunityResourceStatusInput | null;
}

export interface InvitationInput {
  secret?: string | null;
  role?: CommunityPermissionInput | null;
  email?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  version?: number | null;
  id?: string | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  type?: ResourceTypeInput | null;
  dateUpdatedLessThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
}

export interface SearchParameterInput {
  highlightEnable?: boolean | null;
  highlightPreTag?: string | null;
  highlightPostTag?: string | null;
  scoringMode?: ScoringModeInput | null;
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
