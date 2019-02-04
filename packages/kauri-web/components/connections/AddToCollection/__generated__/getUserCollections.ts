/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserCollections
// ====================================================

export interface getUserCollections_searchCollections_content_sections_resources_CommunityDTO {
  __typename: "CommunityDTO" | "PublicUserDTO" | "CommentDTO" | "CommunityMemberDTO" | "TemplateDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface getUserCollections_searchCollections_content_sections_resources_ArticleDTO {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
}

export type getUserCollections_searchCollections_content_sections_resources = getUserCollections_searchCollections_content_sections_resources_CommunityDTO | getUserCollections_searchCollections_content_sections_resources_ArticleDTO;

export interface getUserCollections_searchCollections_content_sections {
  __typename: "SectionDTO";
  id: string | null;
  name: string | null;
  resources: (getUserCollections_searchCollections_content_sections_resources | null)[] | null;
}

export interface getUserCollections_searchCollections_content {
  __typename: "CollectionDTO";
  id: string | null;
  name: string | null;
  sections: (getUserCollections_searchCollections_content_sections | null)[] | null;
}

export interface getUserCollections_searchCollections {
  __typename: "ResponsePage_CollectionDTO";
  content: (getUserCollections_searchCollections_content | null)[] | null;
}

export interface getUserCollections {
  searchCollections: getUserCollections_searchCollections | null;
}

export interface getUserCollectionsVariables {
  userId?: string | null;
}
