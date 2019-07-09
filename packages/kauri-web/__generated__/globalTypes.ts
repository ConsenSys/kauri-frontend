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
  versionGreaterThan?: number | null;
  authorIdEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionIn?: (number | null)[] | null;
  dateCreatedLessThan?: any | null;
  idEquals?: string | null;
  ownerIdEquals?: string | null;
  containsTag?: string | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  ownerIdIn?: (string | null)[] | null;
  latestVersion?: boolean | null;
}

export interface CollectionFilterInput {
  dateUpdatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  resourcesCountGreaterThan?: number | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  nameContains?: string | null;
  containingArticleId?: string | null;
  dateCreatedLessThan?: any | null;
  descriptionContains?: string | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  dateUpdatedLessThan?: any | null;
  fullText?: string | null;
  membersIncludes?: string | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContain?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityInvitationFilterInput {
  dateAddedLessThan?: any | null;
  dateAddedGreaterThan?: any | null;
  communityIdEquals?: string | null;
  statusIn?: (CommunityInvitationStatusInput | null)[] | null;
  deduplicateByEmail?: boolean | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  email?: string | null;
  secret?: string | null;
  role?: CommunityPermissionInput | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustNotContainTag?: (string | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  mustIncludeUserId?: (string | null)[] | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
  mustContainTag?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
  type?: ResourceTypeInput | null;
}

export interface SearchParameterInput {
  highlightEnable?: boolean | null;
  highlightPreTag?: string | null;
  scoringMode?: ScoringModeInput | null;
  highlightPostTag?: string | null;
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
