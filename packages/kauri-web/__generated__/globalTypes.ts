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
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  latestVersion?: boolean | null;
  containsTag?: string | null;
  ownerIdEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  versionGreaterThan?: number | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  idEquals?: string | null;
  versionIn?: (number | null)[] | null;
  checkpointEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  authorIdEquals?: string | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
  containingArticleId?: string | null;
}

export interface CommunityFilterInput {
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  dateUpdatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
}

export interface CommunityInvitationFilterInput {
  statusIn?: (CommunityInvitationStatusInput | null)[] | null;
  dateAddedGreaterThan?: any | null;
  communityIdEquals?: string | null;
  dateAddedLessThan?: any | null;
  deduplicateByEmail?: boolean | null;
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
  mustIncludeUserId?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  type?: ResourceTypeInput | null;
  dateCreatedLessThan?: any | null;
  mustContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
}

export interface SearchParameterInput {
  highlightEnable?: boolean | null;
  scoringMode?: ScoringModeInput | null;
  highlightPostTag?: string | null;
  highlightPreTag?: string | null;
}

export interface SectionDTOInput {
  name?: string | null;
  id?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
