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
  dateCreatedLessThan?: any | null;
  latestVersion?: boolean | null;
  containsTag?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  authorIdEquals?: string | null;
  versionGreaterThan?: number | null;
  fullText?: string | null;
  versionIn?: (number | null)[] | null;
  ownerIdEquals?: string | null;
  idEquals?: string | null;
  dateCreatedGreaterThan?: any | null;
  checkpointEquals?: string | null;
}

export interface CollectionFilterInput {
  ownerIdEquals?: string | null;
  dateUpdatedLessThan?: any | null;
  resourcesCountGreaterThan?: number | null;
  dateUpdatedGreaterThan?: any | null;
  nameContains?: string | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  containingArticleId?: string | null;
  descriptionContains?: string | null;
  dateCreatedGreaterThan?: any | null;
}

export interface CommunityFilterInput {
  statusIn?: (CommunityStatusInput | null)[] | null;
  dateUpdatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  nameContain?: string | null;
  membersIncludes?: string | null;
  nameContains?: string | null;
  fullText?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateCreatedLessThan?: any | null;
}

export interface CommunityResourceFilterInput {
  statusEquals?: CommunityResourceStatusInput | null;
  resourceTypeEquals?: ResourceTypeInput | null;
}

export interface InvitationInput {
  secret?: string | null;
  role?: CommunityPermissionInput | null;
  email?: string | null;
}

export interface ResourceIdentifierInput {
  type?: ResourceTypeInput | null;
  id?: string | null;
  version?: number | null;
}

export interface SearchFilterInput {
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  type?: ResourceTypeInput | null;
  dateCreatedGreaterThan?: any | null;
  mustIncludeUserId?: (string | null)[] | null;
  dateCreatedLessThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  dateUpdatedLessThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  mustContainTag?: (string | null)[] | null;
}

export interface SearchParameterInput {
  highlightPreTag?: string | null;
  highlightEnable?: boolean | null;
  scoringMode?: ScoringModeInput | null;
  highlightPostTag?: string | null;
}

export interface SectionDTOInput {
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  description?: string | null;
  name?: string | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
