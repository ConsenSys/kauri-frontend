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
  versionIn?: (number | null)[] | null;
  versionGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  authorIdEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
  containsTag?: string | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
}

export interface CollectionFilterInput {
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
  descriptionContains?: string | null;
  containingArticleId?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  membersIncludes?: string | null;
  nameContains?: string | null;
  nameContain?: string | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
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
  type?: ResourceTypeInput | null;
  version?: number | null;
  id?: string | null;
}

export interface SearchFilterInput {
  type?: ResourceTypeInput | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
}

export interface SearchParameterInput {
  highlightPreTag?: string | null;
  highlightEnable?: boolean | null;
  highlightPostTag?: string | null;
  scoringMode?: ScoringModeInput | null;
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
