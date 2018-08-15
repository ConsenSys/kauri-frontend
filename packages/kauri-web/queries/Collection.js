import gql from 'graphql-tag'

export const globalCollectionDetails = gql`
    query collection($id: String) {
        collection(id: $id) {
            id,
            name,
            background,
            date_updated,
            date_created,
            description,
            owner {
                user_id,
                username
            }
            sections {
                name
                description
                article_id
                articles {
                    article_id,
                    article_version,
                    user {
                        user_id,
                        username
                    },
                    date_created,
                    request_id,
                    status,
                    tip,
                    text
                    subject
                }
            }
        }
    }
`;