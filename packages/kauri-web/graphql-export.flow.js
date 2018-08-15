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
  downvoteArticle: ?MutationResponse;
  commentArticle: ?MutationResponse;
  createRequest: ?MutationResponse;
  getRequest: ?RequestDTO;
  getAllCuratedList: ?Array<CuratedListDTO>;
  getUser: ?UserDTO;
  createCuratedList: ?MutationResponse;
  searchArticles: ?Page_ArticleDTO;
  deleteArticleComment: ?MutationResponse;
  getTopic: ?TopicDTO;
  searchCollections: ?Page_CollectionDTO;
  addResourceToCuratedList: ?MutationResponse;
  composeCollection: ?MutationResponse;
  searchRequests: ?Page_RequestDTO;
  storeArticleValidationSignature: ?MutationResponse;
  editArticle: ?MutationResponse;
  downvoteRequest: ?MutationResponse;
  getRequestComment: ?Array<CommentDTO>;
  approveArticle: ?MutationResponse;
  getArticle: ?ArticleDTO;
  removeCuratedList: ?MutationResponse;
  deleteRequestComment: ?MutationResponse;
  editRequest: ?MutationResponse;
  removeCollection: ?MutationResponse;
  collection: ?CollectionDTO;
  storeRequestOwnershipSignature: ?MutationResponse;
  getCuratedList: ?CuratedListDTO;
  storeArticleOwnershipSignature: ?MutationResponse;
  addHeaderToCuratedList: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  upvoteArticle: ?MutationResponse;
  submitArticle: ?MutationResponse;
  upvoteRequest: ?MutationResponse;
  commentRequest: ?MutationResponse;
  rejectArticle: ?MutationResponse;
  getArticleComment: ?Array<CommentDTO>;
  createCollection: ?MutationResponse;
}

declare type MutationResponse = {
  hash: ?string;
  message: ?string;
  success: ?boolean;
}

declare type RequestDTO = {
  bounty: ?number;
  category: ?string;
  comments: ?Array<CommentDTO>;
  content_hash: ?string;
  date_created: ?any;
  date_updated: ?any;
  dead_line: ?any;
  is_flagged: ?boolean;
  metadata: ?any;
  request_id: ?string;
  short_description: ?string;
  status: ?RequestStatus;
  sub_category: ?string;
  subject: ?string;
  text: ?string;
  total_flag: ?number;
  total_submissions: ?number;
  total_vote: ?number;
  type: ?ResourceType;
  user: ?UserDTO;
  user_id: ?string;
}

declare type CommentDTO = {
  anchor_key: ?string;
  comment: ?string;
  comment_id: ?number;
  date_created: ?any;
  focus_key: ?string;
  highlight_from: ?number;
  highlight_to: ?number;
  user: ?UserDTO;
  user_id: ?string;
}

declare type UserDTO = {
  user_id: ?string;
  username: ?string;
}

declare type RequestStatus = "CLOSED" | "CREATED" | "EXPIRED" | "FULFILLED" | "IN_PUBLICATION_PERIOD" | "OPENED" | "REFUNDED";

declare type ResourceType = "ARTICLE" | "COLLECTION" | "REQUEST" | "TOPIC";

declare type DTO = RequestDTO | ArticleDTO | TopicDTO | CollectionDTO;

declare type CuratedListDTO = {
  date_created: ?any;
  description: ?string;
  featured: ?boolean;
  header: ?DTO;
  header_id: ?ResourceDTO;
  id: ?string;
  name: ?string;
  owner_id: ?string;
  resource_id: ?Array<ResourceDTO>;
  resources: ?Array<DTO>;
}

declare type ResourceDTO = {
  id: ?string;
  type: ?ResourceType;
}

declare type ResourceDTOInput = {
  id: ?string;
  type: ?ResourceTypeInput;
}

declare type ResourceTypeInput = "ARTICLE" | "COLLECTION" | "REQUEST" | "TOPIC";

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
  article_id: ?string;
  article_version: ?number;
  category: ?string;
  comments: ?Array<CommentDTO>;
  content_hash: ?string;
  date_created: ?any;
  date_updated: ?any;
  metadata: ?any;
  moderator: ?UserDTO;
  rejection_cause: ?string;
  request_id: ?string;
  short_description: ?string;
  signature: ?string;
  status: ?ArticleStatus;
  sub_category: ?string;
  subject: ?string;
  text: ?string;
  tip: ?number;
  total_vote: ?number;
  type: ?ResourceType;
  user: ?UserDTO;
  user_id: ?string;
}

declare type ArticleStatus = "APPROVED" | "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "SUBMITTED";

declare type Sort = {

}

declare type ArticleFilterInput = {
  status_in: ?Array<ArticleStatusInput>;
  total_contribution_lt: ?number;
  user_id_eq: ?string;
  date_updated_lt: ?any;
  total_contribution_gt: ?number;
  date_created_gt: ?any;
  full_text: ?string;
  article_version_eq: ?number;
  moderator_eq: ?string;
  sub_category_in: ?Array<string>;
  date_created_lt: ?any;
  article_id_in: ?Array<string>;
  category_in: ?Array<string>;
  total_vote_lt: ?number;
  article_id_eq: ?string;
  request_id_eq: ?string;
  moderator: ?string;
  subject_ct: ?string;
  total_vote_gt: ?number;
  date_updated_gt: ?any;
  text_ct: ?string;
  latest_version: ?boolean;
}

declare type ArticleStatusInput = "APPROVED" | "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "SUBMITTED";

declare type DirectionInput = "ASC" | "DESC";

declare type TopicDTO = {
  id: ?string;
  type: ?ResourceType;
}

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
  date_created: ?any;
  description: ?string;
  id: ?string;
  name: ?string;
  owner: ?UserDTO;
  owner_id: ?string;
  sections: ?Array<SectionDTO>;
  type: ?ResourceType;
}

declare type SectionDTO = {
  article_id: ?Array<string>;
  articles: ?Array<ArticleDTO>;
  description: ?string;
  name: ?string;
}

declare type CollectionFilterInput = {
  date_updated_lt: ?any;
  name_ct: ?string;
  date_created_lt: ?any;
  description_ct: ?string;
  date_created_gt: ?any;
  owner_id_eq: ?string;
  full_text: ?string;
  date_updated_gt: ?any;
}

declare type SectionDTOInput = {
  article_id: ?Array<string>;
  description: ?string;
  name: ?string;
}

declare type Page_RequestDTO = {
  content: ?Array<RequestDTO>;
  first: ?boolean;
  last: ?boolean;
  number: ?number;
  numberOfElements: ?number;
  size: ?number;
  sort: ?Sort;
  totalElements: ?any;
  totalPages: ?number;
}

declare type RequestFilterInput = {
  total_contribution_lt: ?number;
  user_id_eq: ?string;
  dead_line_lt: ?any;
  date_updated_lt: ?any;
  total_contribution_gt: ?number;
  status_in: ?Array<RequestStatusInput>;
  total_flag_lt: ?number;
  total_submissions_lt: ?number;
  date_created_gt: ?any;
  dead_line_gt: ?any;
  full_text: ?string;
  total_submissions_gt: ?number;
  sub_category_in: ?Array<string>;
  total_flag_gt: ?number;
  date_created_lt: ?any;
  category_in: ?Array<string>;
  total_vote_lt: ?number;
  subject_ct: ?string;
  total_vote_gt: ?number;
  date_updated_gt: ?any;
  text_ct: ?string;
}

declare type RequestStatusInput = "CLOSED" | "CREATED" | "EXPIRED" | "FULFILLED" | "IN_PUBLICATION_PERIOD" | "OPENED" | "REFUNDED";

/**
  Mutation root type
*/
declare type Mutation = {
  getEvent: ?boolean;
  downvoteArticle: ?MutationResponse;
  commentArticle: ?MutationResponse;
  createRequest: ?MutationResponse;
  createCuratedList: ?MutationResponse;
  deleteArticleComment: ?MutationResponse;
  addResourceToCuratedList: ?MutationResponse;
  composeCollection: ?MutationResponse;
  storeArticleValidationSignature: ?MutationResponse;
  editArticle: ?MutationResponse;
  downvoteRequest: ?MutationResponse;
  approveArticle: ?MutationResponse;
  removeCuratedList: ?MutationResponse;
  submitForReview: ?MutationResponse;
  deleteRequestComment: ?MutationResponse;
  editRequest: ?MutationResponse;
  removeCollection: ?MutationResponse;
  storeRequestOwnershipSignature: ?MutationResponse;
  storeArticleOwnershipSignature: ?MutationResponse;
  addHeaderToCuratedList: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  upvoteArticle: ?MutationResponse;
  submitArticle: ?MutationResponse;
  upvoteRequest: ?MutationResponse;
  commentRequest: ?MutationResponse;
  rejectArticle: ?MutationResponse;
  createCollection: ?MutationResponse;
}

/**
  Subscription root type
*/
declare type Subscription = {
  getEvent: ?boolean;
}