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
  editArticleVersion: ?MutationResponse;
  searchCommunities: ?Page_CommunityDTO;
  addUser: ?MutationResponse;
  submitArticleVersion: ?MutationResponse;
  getAllCuratedList: ?Array<CuratedListDTO>;
  getUser: ?PublicUserDTO;
  createCuratedList: ?MutationResponse;
  submitResource: ?MutationResponse;
  countVote: ?VoteStatDTO;
  searchArticles: ?Page_ArticleDTO;
  searchCollections: ?Page_CollectionDTO;
  addResourceToCuratedList: ?MutationResponse;
  removeResource: ?MutationResponse;
  approveResource: ?MutationResponse;
  getComment: ?Page_CommentDTO;
  addComment: ?MutationResponse;
  vote: ?MutationResponse;
  approveArticle: ?MutationResponse;
  getMyProfile: ?UserDTO;
  getCollection: ?CollectionDTO;
  resource: ?AbstractResourceDTO;
  getArticle: ?ArticleDTO;
  removeCuratedList: ?MutationResponse;
  publishArticle: ?MutationResponse;
  resources: ?Array<AbstractResourceDTO>;
  getCuratedList: ?CuratedListDTO;
  removeResourceFromCuratedList: ?MutationResponse;
  addHeaderToCuratedList: ?MutationResponse;
  submitNewArticle: ?MutationResponse;
  submitArticle: ?MutationResponse;
  getArticleProof: ?ArticleProof;
  rejectArticle: ?MutationResponse;
  checkpointArticles: ?MutationResponse;
  createCollection: ?MutationResponse;
}

declare type CommunityDTO = {
  approved: ?Array<AbstractResourceDTO>;
  approvedId: ?Array<ResourceIdentifier>;
  avatar: ?string;
  creator: ?PublicUserDTO;
  creatorId: ?string;
  dateCreated: ?any;
  dateUpdated: ?any;
  description: ?string;
  id: ?string;
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
  articles: ?Page_ArticleDTO;
  avatar: ?string;
  communities: ?Array<CommunityDTO>;
  id: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  title: ?string;
  website: ?string;
  username?: string,
}

declare type Page_ArticleDTO = {
  content: ?Array<ArticleDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type ArticleDTO = {
  attributes: ?any;
  author: ?PublicUserDTO;
  authorId: ?string;
  checkpoint: ?string;
  comments: ?Page_CommentDTO;
  content: ?string;
  contentHash: ?string;
  dateCreated: ?any;
  datePublished: ?any;
  id: ?string;
  owner: ?AbstractResourceDTO;
  ownerId: ?ResourceIdentifier;
  resourceIdentifier: ?ResourceIdentifier;
  signature: ?string;
  status: ?ArticleStatus;
  title: ?string;
  version: ?number;
  vote: ?VoteStatDTO;
}

declare type Page_CommentDTO = {
  content: ?Array<CommentDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CommentDTO = {
  author: ?PublicUserDTO;
  authorId: ?string;
  body: ?string;
  id: ?string;
  parent: ?AbstractResourceDTO;
  parentId: ?ResourceIdentifier;
  posted: ?any;
  resourceIdentifier: ?ResourceIdentifier;
}

declare type AbstractResourceDTO = CommunityDTO | PublicUserDTO | ArticleDTO | CommentDTO | CommunityMemberDTO | CuratedListDTO | CollectionDTO | UserDTO;

declare type ArticleStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

declare type VoteStatDTO = {
  parentId: ?ResourceIdentifier;
  totalVote: ?any;
}

declare type Sort = {

}

declare type ArticleFilterInput = {
  idEquals: ?string;
  checkpointEquals: ?string;
  ownerEquals: ?string;
  ownerIdEquals: ?string;
  statusIn: ?Array<ArticleStatusInput>;
  dateCreatedGreaterThan: ?any;
  dateCreatedLessThan: ?any;
  fullText: ?string;
  authorIdEquals: ?string;
  latestVersion: ?boolean;
}

declare type ArticleStatusInput = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

declare type DirectionInput = "ASC" | "DESC";

declare type ResourceIdentifier = {
  id: ?string;
  type: ?ResourceType;
  version: ?number;
}

declare type ResourceType = "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "REQUEST" | "USER";

declare type CommunityMemberDTO = {
  articles: ?Page_ArticleDTO;
  avatar: ?string;
  communities: ?Array<CommunityDTO>;
  id: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  role: ?CommunityPermission;
  social: ?any;
  title: ?string;
  website: ?string;
}

declare type CommunityPermission = "ADMIN" | "CURATOR";

declare type CommunityStatus = "CLOSED" | "CREATED" | "OPENED";

declare type MutationResponse = {
  hash: ?string;
  message: ?string;
  success: ?boolean;
}

declare type Page_CommunityDTO = {
  content: ?Array<CommunityDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CommunityFilterInput = {
  nameContain: ?string;
  dateUpdatedLessThan: ?any;
  dateUpdatedGreaterThan: ?any;
  membersIncludes: ?string;
  dateCreatedGreaterThan: ?any;
  nameContains: ?string;
  dateCreatedLessThan: ?any;
  fullText: ?string;
}

declare type CuratedListDTO = {
  dateCreated: ?any;
  description: ?string;
  featured: ?boolean;
  header: ?AbstractResourceDTO;
  headerId: ?ResourceIdentifier;
  id: ?string;
  name: ?string;
  owner: ?PublicUserDTO;
  ownerId: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  resources: ?Array<AbstractResourceDTO>;
  resourcesId: ?Array<ResourceIdentifier>;
}

declare type ResourceIdentifierInput = {
  id: ?string;
  version: ?number;
  type: ?ResourceTypeInput;
}

declare type ResourceTypeInput = "ARTICLE" | "COLLECTION" | "COMMENT" | "COMMUNITY" | "CURATED_LIST" | "REQUEST" | "USER";

declare type Page_CollectionDTO = {
  content: ?Array<CollectionDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type CollectionDTO = {
  background: ?string;
  dateCreated: ?any;
  dateUpdated: ?any;
  description: ?string;
  id: ?string;
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
  ownerIdEqual: ?string;
  dateUpdatedLessThan: ?any;
  dateUpdatedGreaterThan: ?any;
  descriptionContains: ?string;
  dateCreatedGreaterThan: ?any;
  nameContains: ?string;
  dateCreatedLessThan: ?any;
  fullText: ?string;
}

declare type UserDTO = {
  articles: ?Page_ArticleDTO;
  avatar: ?string;
  communities: ?Array<CommunityDTO>;
  email: ?string;
  id: ?string;
  name: ?string;
  resourceIdentifier: ?ResourceIdentifier;
  social: ?any;
  title: ?string;
  website: ?string;
}

declare type ArticleProof = {
  articleLeafHash: ?string;
  checkpointHash: ?string;
  checkpointMerkleRoot: ?string;
  proofHashes: ?Array<string>;
}

declare type SectionDTOInput = {
  resourcesId: ?Array<ResourceIdentifierInput>;
  description: ?string;
  name: ?string;
}

/**
  Mutation root type
*/
declare type Mutation = {
  getEvent: ?boolean;
  editArticleVersion: ?MutationResponse;
  submitArticleVersion: ?MutationResponse;
  removeCuratedList: ?MutationResponse;
  publishArticle: ?MutationResponse;
  createCuratedList: ?MutationResponse;
  submitResource: ?MutationResponse;
  addResourceToCuratedList: ?MutationResponse;
  removeResource: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  addHeaderToCuratedList: ?MutationResponse;
  composeCollection: ?MutationResponse;
  submitNewArticle: ?MutationResponse;
  submitArticle: ?MutationResponse;
  approveResource: ?MutationResponse;
  rejectArticle: ?MutationResponse;
  createCommunity: ?MutationResponse;
  checkpointArticles: ?MutationResponse;
  addComment: ?MutationResponse;
  vote: ?MutationResponse;
  approveArticle: ?MutationResponse;
  createCollection: ?MutationResponse;
  saveUser: ?MutationResponse;
}

/**
  Subscription root type
*/
declare type Subscription = {
  getEvent: ?boolean;
}