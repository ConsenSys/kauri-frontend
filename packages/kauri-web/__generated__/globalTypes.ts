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
  dateCreatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  idEquals?: string | null;
  statusIn?: (ArticleStatusInput | null)[] | null;
  versionGreaterThan?: number | null;
  ownerIdIn?: (string | null)[] | null;
  authorIdEquals?: string | null;
  checkpointEquals?: string | null;
  fullText?: string | null;
  dateCreatedLessThan?: any | null;
  containsTag?: string | null;
  versionIn?: (number | null)[] | null;
  latestVersion?: boolean | null;
}

export interface CollectionFilterInput {
  dateCreatedLessThan?: any | null;
  containingArticleId?: string | null;
  dateUpdatedLessThan?: any | null;
  fullText?: string | null;
  resourcesCountGreaterThan?: number | null;
  descriptionContains?: string | null;
  dateCreatedGreaterThan?: any | null;
  dateUpdatedGreaterThan?: any | null;
  ownerIdEquals?: string | null;
  nameContains?: string | null;
}

export interface CommunityFilterInput {
  membersIncludes?: string | null;
  dateUpdatedLessThan?: any | null;
  dateCreatedLessThan?: any | null;
  fullText?: string | null;
  nameContain?: string | null;
  dateUpdatedGreaterThan?: any | null;
  statusIn?: (CommunityStatusInput | null)[] | null;
  nameContains?: string | null;
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
  version?: number | null;
  type?: ResourceTypeInput | null;
  id?: string | null;
}

export interface SearchFilterInput {
  dateCreatedLessThan?: any | null;
  types?: (ResourceTypeInput | null)[] | null;
  type?: ResourceTypeInput | null;
  dateCreatedGreaterThan?: any | null;
  mustContainTag?: (string | null)[] | null;
  mustNotIncludeUserId?: (string | null)[] | null;
  mustNotContainTag?: (string | null)[] | null;
  dateUpdatedGreaterThan?: any | null;
  mustIncludeUserId?: (string | null)[] | null;
  dateUpdatedLessThan?: any | null;
}

export interface SearchParameterInput {
  scoringMode?: ScoringModeInput | null;
  highlightEnable?: boolean | null;
  highlightPreTag?: string | null;
  highlightPostTag?: string | null;
}

export interface SectionDTOInput {
  description?: string | null;
  name?: string | null;
  resourcesId?: (ResourceIdentifierInput | null)[] | null;
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
