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
  createCuratedList: ?MutationResponse;
  searchArticles: ?Page_ArticleDTO;
  deleteArticleComment: ?MutationResponse;
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
  collection: ?CollectionDTO;
  storeRequestOwnershipSignature: ?MutationResponse;
  getCuratedList: ?CuratedListDTO;
  storeArticleOwnershipSignature: ?MutationResponse;
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

declare type RequestStatus = "CLOSED" | "CREATED" | "EXPIRED" | "FULFILLED" | "IN_MODERATION_PERIOD" | "OPENED" | "REFUNDED";

declare type CuratedListDTO = {
  date_created: ?any;
  description: ?string;
  id: ?string;
  name: ?string;
  owner_id: ?string;
  resources: ?Array<ResourceDTO>;
}

declare type ResourceDTO = {
  id: ?string;
  type: ?ResourceType;
}

declare type ResourceType = "ARTICLE" | "COLLECTION";

declare type ResourceDTOInput = {
  id: ?string;
  type: ?ResourceTypeInput;
}

declare type ResourceTypeInput = "ARTICLE" | "COLLECTION";

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
  user: ?UserDTO;
  user_id: ?string;
}

declare type ArticleStatus = "APPROVED" | "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "SUBMITTED";

declare type Sort = {

}

declare type ArticleFilterInput = {
  date_created_lt: ?any;
  user_id_eq: ?string;
  sub_category_in: ?Array<string>;
  date_updated_gt: ?any;
  category_in: ?Array<string>;
  status_in: ?Array<ArticleStatusInput>;
  total_contribution_lt: ?number;
  full_text: ?string;
  total_contribution_gt: ?number;
  latest_version: ?boolean;
  total_vote_lt: ?number;
  moderator_eq: ?string;
  date_updated_lt: ?any;
  total_vote_gt: ?number;
  article_version_eq: ?number;
  request_id_eq: ?string;
  date_created_gt: ?any;
  article_id_eq: ?string;
  text_ct: ?string;
  moderator: ?string;
  subject_ct: ?string;
}

declare type ArticleStatusInput = "APPROVED" | "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "SUBMITTED";

declare type DirectionInput = "ASC" | "DESC";

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
  date_created: ?any;
  description: ?string;
  id: ?string;
  name: ?string;
  owner_id: ?string;
  sections: ?Array<SectionDTO>;
}

declare type SectionDTO = {
  articles: ?Array<string>;
  description: ?string;
  name: ?string;
}

declare type CollectionFilterInput = {
  date_created_lt: ?any;
  date_updated_lt: ?any;
  name_ct: ?string;
  date_updated_gt: ?any;
  description_ct: ?string;
  owner_id_eq: ?string;
  date_created_gt: ?any;
  full_text: ?string;
}

declare type SectionDTOInput = {
  articles: ?Array<string>;
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
  date_created_lt: ?any;
  user_id_eq: ?string;
  total_flag_lt: ?number;
  total_submissions_lt: ?number;
  sub_category_in: ?Array<string>;
  total_submissions_gt: ?number;
  date_updated_gt: ?any;
  category_in: ?Array<string>;
  total_contribution_lt: ?number;
  full_text: ?string;
  total_contribution_gt: ?number;
  status_in: ?Array<RequestStatusInput>;
  total_vote_lt: ?number;
  date_updated_lt: ?any;
  dead_line_lt: ?any;
  total_vote_gt: ?number;
  dead_line_gt: ?any;
  date_created_gt: ?any;
  total_flag_gt: ?number;
  text_ct: ?string;
  subject_ct: ?string;
}

declare type RequestStatusInput = "CLOSED" | "CREATED" | "EXPIRED" | "FULFILLED" | "IN_MODERATION_PERIOD" | "OPENED" | "REFUNDED";

/**
  Mutation root type
*/
declare type Mutation = {
  getEvent: ?boolean;
  downvoteArticle: ?MutationResponse;
  commentArticle: ?MutationResponse;
  createRequest: ?MutationResponse;
  removeCuratedList: ?MutationResponse;
  submitForReview: ?MutationResponse;
  deleteRequestComment: ?MutationResponse;
  createCuratedList: ?MutationResponse;
  editRequest: ?MutationResponse;
  deleteArticleComment: ?MutationResponse;
  storeRequestOwnershipSignature: ?MutationResponse;
  addResourceToCuratedList: ?MutationResponse;
  storeArticleOwnershipSignature: ?MutationResponse;
  removeResourceFromCuratedList: ?MutationResponse;
  composeCollection: ?MutationResponse;
  upvoteArticle: ?MutationResponse;
  storeArticleValidationSignature: ?MutationResponse;
  submitArticle: ?MutationResponse;
  upvoteRequest: ?MutationResponse;
  editArticle: ?MutationResponse;
  commentRequest: ?MutationResponse;
  downvoteRequest: ?MutationResponse;
  rejectArticle: ?MutationResponse;
  approveArticle: ?MutationResponse;
  createCollection: ?MutationResponse;
}

/**
  Subscription root type
*/
declare type Subscription = {
  getEvent: ?boolean;
}