import gql from 'graphql-tag'

export const HomePageQuery = gql`
  query getAllCuratedList {
    getAllCuratedList {
      id
      name
      description
      owner_id
      featured
      header_id {
        type
        id
      }
      header {
        ... on TopicDTO {
          id
          type
        }

        ... on CollectionDTO {
          id
          type
        }

        ... on ArticleDTO {
          article_id
          type
        }

        ... on RequestDTO {
          request_id
          type
        }
      }
      resource_id {
        type
        id
      }
      resources {
        type
        ... on RequestDTO {
          request_id
          user_id
          user {
            user_id
            username
          }
          request_id
          date_created
          date_updated
          bounty
          subject
          category
          sub_category
          short_description
          text
          status
          total_vote
          total_flag
          total_submissions
          is_flagged
          metadata
          comments {
            comment_id
            comment
          }
          content_hash
          metadata
        }
        ... on TopicDTO {
          id
        }
        ... on ArticleDTO {
          article_id
          article_version
          user_id
          user {
            user_id
            username
          }
          date_created
          request_id
          subject
          tip
          text
        }
        ... on CollectionDTO {
          id
          name
          description
          date_created
          background
          owner_id
          sections {
            article_id
          }
        }
      }
    }
  }
`
