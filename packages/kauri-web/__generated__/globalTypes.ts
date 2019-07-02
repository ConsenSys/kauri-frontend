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
  statusIn?: (ArticleStatusInput | null)[] | null;
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  containsTag?: string | null;
  dateCreatedGreaterThan?: any | null;
  versionIn?: (number | null)[] | null;
  versionGreaterThan?: number | null;
  latestVersion?: boolean | null;
  authorIdEquals?: string | null;
  idEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
}

export interface CollectionFilterInput {
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  nameContains?: string | null;
  fullText?: string | null;
  ownerIdEquals?: string | null;
  descriptionContains?: string | null;
  containingArticleId?: string | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateCreatedLessThan?: any | null;
  membersIncludes?: string | null;
  nameContain?: string | null;
  dateUpdatedLessThan?: any | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
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
  dateUpdatedGreaterThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  mustContainTag?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
  type?: ResourceTypeInput | null;
  mustIncludeUserId?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
}

export interface SearchParameterInput {
  scoringMode?: ScoringModeInput | null;
  highlightPostTag?: string | null;
  highlightPreTag?: string | null;
  highlightEnable?: boolean | null;
}

export interface SectionDTOInput {
  id?: string | null;
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
