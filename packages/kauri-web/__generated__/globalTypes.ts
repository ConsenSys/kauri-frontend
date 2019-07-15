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
  statusIn?: (ArticleStatusInput | null)[] | null;
  checkpointEquals?: string | null;
  idEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  authorIdEquals?: string | null;
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  latestVersion?: boolean | null;
  versionIn?: (number | null)[] | null;
  containsTag?: string | null;
  versionGreaterThan?: number | null;
}

export interface CollectionFilterInput {
  dateUpdatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
}

export interface CommunityFilterInput {
  membersIncludes?: string | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
}

export interface CommunityInvitationFilterInput {
  dateAddedLessThan?: any | null;
  communityIdEquals?: string | null;
  dateAddedGreaterThan?: any | null;
  deduplicateByEmail?: boolean | null;
  statusIn?: (CommunityInvitationStatusInput | null)[] | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
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
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  type?: ResourceTypeInput | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  types?: (ResourceTypeInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  mustContainTag?: (string | null)[] | null;
}

export interface SearchParameterInput {
  highlightPreTag?: string | null;
  highlightPostTag?: string | null;
  highlightEnable?: boolean | null;
  scoringMode?: ScoringModeInput | null;
}

export interface SectionDTOInput {
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  description?: string | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
