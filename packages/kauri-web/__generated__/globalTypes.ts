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
  statusIn?: (ArticleStatusInput | null)[] | null;
  latestVersion?: boolean | null;
  dateCreatedGreaterThan?: any | null;
  authorIdEquals?: string | null;
  versionIn?: (number | null)[] | null;
  containsTag?: string | null;
  fullText?: string | null;
  idEquals?: string | null;
  checkpointEquals?: string | null;
  versionGreaterThan?: number | null;
  dateCreatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  ownerIdIn?: (string | null)[] | null;
}

export interface CollectionFilterInput {
  dateCreatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  ownerIdEquals?: string | null;
  containingArticleId?: string | null;
  dateUpdatedGreaterThan?: any | null;
  descriptionContains?: string | null;
  nameContains?: string | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  resourcesCountGreaterThan?: number | null;
}

export interface CommunityFilterInput {
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  membersIncludes?: string | null;
  fullText?: string | null;
  nameContains?: string | null;
  dateUpdatedLessThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContain?: string | null;
  dateCreatedGreaterThan?: any | null;
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
  id?: string | null;
  type?: ResourceTypeInput | null;
  version?: number | null;
}

export interface SearchFilterInput {
  dateCreatedLessThan?: any | null;
  dateUpdatedLessThan?: any | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  mustContainTag?: (string | null)[] | null;
  types?: (ResourceTypeInput | null)[] | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
}

export interface SearchParameterInput {
  scoringMode?: ScoringModeInput | null;
  highlightPostTag?: string | null;
  highlightPreTag?: string | null;
  highlightEnable?: boolean | null;
}

export interface SectionDTOInput {
  description?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
  name?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
