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
  ownerIdEquals?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  versionGreaterThan?: number | null;
  containsTag?: string | null;
  ownerIdIn?: (string | null)[] | null;
  versionIn?: (number | null)[] | null;
  authorIdEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  latestVersion?: boolean | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CollectionFilterInput {
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  fullText?: string | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
}

export interface CommunityResourceFilterInput {
  resourceTypeEquals?: ResourceTypeInput | null;
  statusEquals?: CommunityResourceStatusInput | null;
}

export interface InvitationInput {
  role?: CommunityPermissionInput | null;
  secret?: string | null;
  email?: string | null;
}

export interface ResourceIdentifierInput {
  version?: number | null;
  id?: string | null;
  type?: ResourceTypeInput | null;
}

export interface SearchFilterInput {
  mustContainTag?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  dateCreatedGreaterThan?: any | null;
}

export interface SearchParameterInput {
  highlightEnable?: boolean | null;
  scoringMode?: ScoringModeInput | null;
  highlightPreTag?: string | null;
  highlightPostTag?: string | null;
}

export interface SectionDTOInput {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
