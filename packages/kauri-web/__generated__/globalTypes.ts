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
  fullText?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  containsTag?: string | null;
  latestVersion?: boolean | null;
  dateCreatedLessThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  ownerIdIn?: (string | null)[] | null;
  versionGreaterThan?: number | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  authorIdEquals?: string | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  descriptionContains?: string | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
}

export interface CommunityFilterInput {
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedLessThan?: any | null;
  nameContains?: string | null;
  membersIncludes?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
  nameContain?: string | null;
  fullText?: string | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface CommunityInvitationFilterInput {
  communityIdEquals?: string | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateAddedLessThan?: any | null;
  dateAddedGreaterThan?: any | null;
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
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustIncludeUserId?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  dateUpdatedLessThan?: any | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  dateCreatedGreaterThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
}

export interface SearchParameterInput {
  highlightPreTag?: string | null;
  scoringMode?: ScoringModeInput | null;
  highlightPostTag?: string | null;
  highlightEnable?: boolean | null;
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
