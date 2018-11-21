/* @flow */

declare type GraphQLResponseRoot = {
  data?: Query | Mutation;
  errors?: Array<GraphQLResponseError>;
}

declare type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

declare type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}

/**
  Query root type
*/
declare type Query = {
  getCommunity: ?CommunityDTO;
  submitArticleVersion: ?MutationResponse;
  countVote: ?VoteStatDTO;
  searchUsers: ?ResponsePage_PublicUserDTO;
  removeResource: ?MutationResponse;
  addComment: ?MutationResponse;
  saveUser: ?MutationResponse;
  resource: ?AbstractResourceDTO;
  removeCuratedList: ?MutationResponse;
  publishArticle: ?MutationResponse;
  cancelArticle: ?MutationResponse;
  getCuratedList: ?CuratedListDTO;
  migrateCollection: ?MutationResponse;
  curateResource: ?MutationResponse;
  submitArticle: ?MutationResponse;
  checkpointArticles: ?MutationResponse;
  createCollection: ?MutationResponse;
  searchCommunities: ?ResponsePage_CommunityDTO;
  editArticleVersion: ?MutationResponse;
  getUser: ?PublicUserDTO;
  getAllCuratedList: ?Array<CuratedListDTO>;
  createCuratedList: ?MutationResponse;
  searchArticles: ?ResponsePage_ArticleDTO;
  searchCollections: ?ResponsePage_CollectionDTO;
  addResourceToCuratedList: ?MutationResponse;
  search: ?ResponsePage_SearchResultDTO;
  approveResource: ?MutationResponse;
  getComment: ?ResponsePage_CommentDTO;
  vote: ?MutationResponse;
  approveArticle: ?MutationResponse;
  getMyProfile: ?UserDTO;
  getCollection: ?CollectionDTO;
  getArticle: ?ArticleDTO;
  resources: ?Array<AbstractResourceDTO>;
  migrateArticle: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  addHeaderToCuratedList: ?MutationResponse;
  submitNewArticle: ?MutationResponse;
  getArticleProof: ?ArticleProof;
  rejectArticle: ?MutationResponse;
}

declare type CommunityDTO = {
  approved: ?Array<AbstractResourceDTO>;
  approvedId: ?Array<ResourceIdentifier>;
  attributes: ?any;
  avatar: ?string;
  creator: ?PublicUserDTO;
  creatorId: ?string;
  dateCreated: ?any;
  dateUpdated: ?any;
  description: ?string;
  id: ?string;
  interfaceName: ?string;
  members: ?Array<CommunityMemberDTO>;
  membersId: ?any;
  metadataLocator: ?string;
  name: ?string;
  pending: ?Array<AbstractResourceDTO>;
  pendingId: ?Array<ResourceIdentifier>;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  status: ?CommunityStatus;
  website: ?string;
}

declare type PublicUserDTO = {
  articles: ?ResponsePage_ArticleDTO;
  avatar: ?string;
  communities: ?Array<CommunityDTO>;
  id: ?string;
  interfaceName: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  title: ?string;
  username: ?string;
  website: ?string;
}

declare type ResponsePage_ArticleDTO = {
  content: ?Array<ArticleDTO>;
  hasContent: ?boolean;
  hasNext: ?boolean;
  hasPrevious: ?boolean;
  isFirst: ?boolean;
  isLast: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  totalElements: ?any;
  totalPages: ?number;
}

declare type ArticleDTO = {
  attributes: ?any;
  author: ?PublicUserDTO;
  authorId: ?string;
  checkpoint: ?string;
  comments: ?ResponsePage_CommentDTO;
  content: ?string;
  contentHash: ?string;
  contributors: ?Array<PublicUserDTO>;
  dateCreated: ?any;
  datePublished: ?any;
  id: ?string;
  interfaceName: ?string;
  owner: ?AbstractResourceDTO;
  ownerId: ?ResourceIdentifier;
  resourceIdentifier: ?ResourceIdentifier;
  signature: ?string;
  status: ?ArticleStatus;
  title: ?string;
  version: ?number;
  vote: ?VoteStatDTO;
}

declare type ResponsePage_CommentDTO = {
  content: ?Array<CommentDTO>;
  hasContent: ?boolean;
  hasNext: ?boolean;
  hasPrevious: ?boolean;
  isFirst: ?boolean;
  isLast: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CommentDTO = {
  author: ?PublicUserDTO;
  authorId: ?string;
  body: ?string;
  id: ?string;
  interfaceName: ?string;
  parent: ?AbstractResourceDTO;
  parentId: ?ResourceIdentifier;
  posted: ?any;
  resourceIdentifier: ?ResourceIdentifier;
}

declare type AbstractResourceDTO = CommunityDTO | PublicUserDTO | ArticleDTO | CommentDTO | CommunityMemberDTO | CuratedListDTO | CollectionDTO | SearchResultDTO | UserDTO;

declare type ArticleStatus = "CANCELLED" | "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

declare type VoteStatDTO = {
  parentId: ?ResourceIdentifier;
  totalVote: ?any;
}

declare type ArticleFilterInput = {
  statusIn: ?Array<ArticleStatusInput>;
  idEquals: ?string;
  checkpointEquals: ?string;
  ownerEquals: ?string;
  ownerIdEquals: ?string;
  dateCreatedGreaterThan: ?any;
  dateCreatedLessThan: ?any;
  versionIn: ?Array<number>;
  fullText: ?string;
  authorIdEquals: ?string;
  latestVersion: ?boolean;
}

declare type ArticleStatusInput = "CANCELLED" | "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

declare type DirectionInput = "ASC" | "DESC";

declare type ResourceIdentifier = {
  id: ?string;
  type: ?ResourceType;
  version: ?number;
}

declare type ResourceType = "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "REQUEST" | "USER";

declare type CommunityMemberDTO = {
  articles: ?ResponsePage_ArticleDTO;
  avatar: ?string;
  communities: ?Array<CommunityDTO>;
  id: ?string;
  interfaceName: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  role: ?CommunityPermission;
  social: ?any;
  title: ?string;
  username: ?string;
  website: ?string;
}

declare type CommunityPermission = "ADMIN" | "CURATOR";

declare type CommunityStatus = "CLOSED" | "CREATED" | "OPENED";

declare type MutationResponse = {
  hash: ?string;
  message: ?string;
  success: ?boolean;
}

declare type ResourceIdentifierInput = {
  id: ?string;
  type: ?ResourceTypeInput;
  version: ?number;
}

declare type ResourceTypeInput = "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "REQUEST" | "USER";

declare type ResponsePage_PublicUserDTO = {
  content: ?Array<PublicUserDTO>;
  hasContent: ?boolean;
  hasNext: ?boolean;
  hasPrevious: ?boolean;
  isFirst: ?boolean;
  isLast: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  totalElements: ?any;
  totalPages: ?number;
}

declare type UserFilterInput = {
  fullText: ?string;
}

declare type CuratedListDTO = {
  dateCreated: ?any;
  description: ?string;
  featured: ?boolean;
  header: ?AbstractResourceDTO;
  headerId: ?ResourceIdentifier;
  id: ?string;
  interfaceName: ?string;
  name: ?string;
  owner: ?PublicUserDTO;
  ownerId: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  resources: ?Array<AbstractResourceDTO>;
  resourcesId: ?Array<ResourceIdentifier>;
}

declare type SectionDTOInput = {
  resourcesId: ?Array<ResourceIdentifierInput>;
  description: ?string;
  name: ?string;
}

declare type ResponsePage_CommunityDTO = {
  content: ?Array<CommunityDTO>;
  hasContent: ?boolean;
  hasNext: ?boolean;
  hasPrevious: ?boolean;
  isFirst: ?boolean;
  isLast: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CommunityFilterInput = {
  nameContain: ?string;
  dateUpdatedLessThan: ?any;
  dateUpdatedGreaterThan: ?any;
  membersIncludes: ?string;
  dateCreatedGreaterThan: ?any;
  dateCreatedLessThan: ?any;
  nameContains: ?string;
  fullText: ?string;
}

declare type ResponsePage_CollectionDTO = {
  content: ?Array<CollectionDTO>;
  hasContent: ?boolean;
  hasNext: ?boolean;
  hasPrevious: ?boolean;
  isFirst: ?boolean;
  isLast: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CollectionDTO = {
  attributes: ?any;
  background: ?string;
  dateCreated: ?any;
  dateUpdated: ?any;
  description: ?string;
  id: ?string;
  interfaceName: ?string;
  name: ?string;
  owner: ?PublicUserDTO;
  ownerId: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  sections: ?Array<SectionDTO>;
  vote: ?VoteStatDTO;
}

declare type SectionDTO = {
  description: ?string;
  name: ?string;
  resources: ?Array<AbstractResourceDTO>;
  resourcesId: ?Array<ResourceIdentifier>;
}

declare type CollectionFilterInput = {
  dateUpdatedLessThan: ?any;
  dateUpdatedGreaterThan: ?any;
  containingArticleId: ?string;
  descriptionContains: ?string;
  ownerIdEquals: ?string;
  dateCreatedGreaterThan: ?any;
  dateCreatedLessThan: ?any;
  nameContains: ?string;
  fullText: ?string;
}

declare type ResponsePage_SearchResultDTO = {
  content: ?Array<SearchResultDTO>;
  hasContent: ?boolean;
  hasNext: ?boolean;
  hasPrevious: ?boolean;
  isFirst: ?boolean;
  isLast: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  totalElements: ?any;
  totalPages: ?number;
}

declare type SearchResultDTO = {
  description: ?string;
  interfaceName: ?string;
  lastUpdated: ?any;
  name: ?string;
  resource: ?ResourceIdentifier;
  resourceIdentifier: ?ResourceIdentifier;
  score: ?number;
  tags: ?Array<string>;
}

declare type UserDTO = {
  articles: ?ResponsePage_ArticleDTO;
  avatar: ?string;
  communities: ?Array<CommunityDTO>;
  email: ?string;
  id: ?string;
  interfaceName: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  title: ?string;
  username: ?string;
  website: ?string;
}

declare type ArticleProof = {
  articleLeafHash: ?string;
  checkpointHash: ?string;
  checkpointMerkleRoot: ?string;
  proofHashes: ?Array<string>;
}

/**
  Mutation root type
*/
declare type Mutation = {
  getEvent: ?boolean;
  editArticleVersion: ?MutationResponse;
  submitArticleVersion: ?MutationResponse;
  createCuratedList: ?MutationResponse;
  removeResource: ?MutationResponse;
  addResourceToCuratedList: ?MutationResponse;
  composeCollection: ?MutationResponse;
  approveResource: ?MutationResponse;
  vote: ?MutationResponse;
  addComment: ?MutationResponse;
  approveArticle: ?MutationResponse;
  saveUser: ?MutationResponse;
  removeCuratedList: ?MutationResponse;
  publishArticle: ?MutationResponse;
  cancelArticle: ?MutationResponse;
  migrateArticle: ?MutationResponse;
  migrateCollection: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  addHeaderToCuratedList: ?MutationResponse;
  submitNewArticle: ?MutationResponse;
  curateResource: ?MutationResponse;
  submitArticle: ?MutationResponse;
  createCommunity: ?MutationResponse;
  checkpointArticles: ?MutationResponse;
  rejectArticle: ?MutationResponse;
  createCollection: ?MutationResponse;
}

/**
  Subscription root type
*/
declare type Subscription = {
  getEvent: ?boolean;
}