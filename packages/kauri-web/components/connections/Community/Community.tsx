import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import gql from "graphql-tag";
import moment from "moment";
import { Query } from "react-apollo";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import CommunityProfile from "../../../../kauri-components/components/Community/CommunityProfile";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import Empty from "../../containers/PublicProfile/Empty";
import {
  searchCommunityArticles,
  searchCommunityArticlesVariables,
} from "./__generated__/searchCommunityArticles";

const query = gql`
  query searchCommunityArticles($category: String) {
    searchArticles(
      filter: {
        statusIn: [PUBLISHED]
        latestVersion: true
        ownerEquals: $category
      }
    ) {
      content {
        id
        version
        title
        content
        dateCreated
        datePublished
        author {
          id
          name
          avatar
          username
        }
        status
        attributes
        contentHash
        checkpoint
        vote {
          totalVote
        }
        comments {
          content {
            posted
            author {
              id
              name
              avatar
              username
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
      totalPages
      totalElements
    }
  }
`;

const CommunityHeader = styled.section`
  display: flex;
  height: 255px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.textPrimary};
  padding: 0px ${props => props.theme.padding};
`;

const ArticlesSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0px;
  padding: 0px ${props => props.theme.padding};
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

const RuntimeProps = t.interface({
  avatar: t.string,
  category: t.string,
  hostName: t.string,
  id: t.string,
  name: t.string,
  website: t.string,
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  const { avatar, category, hostName, id, name, website } = RuntimeProps.decode(
    props
  ).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  return (
    <section>
      <CommunityHeader>
        <CommunityProfile
          id={id}
          avatar={avatar}
          name={name}
          website={website}
          hostName={hostName}
        />
      </CommunityHeader>
      <Query<searchCommunityArticles, searchCommunityArticlesVariables>
        query={query}
        variables={{ category }}
      >
        {queryProps => {
          if (queryProps.loading) {
            return <Loading />;
          }
          if (queryProps.error) {
            // console.log(queryProps.error);
            return <ErrorMessage message={queryProps.error.message} />;
          }
          if (queryProps.data) {
            if (
              queryProps.data.searchArticles &&
              queryProps.data.searchArticles.content
            ) {
              const linkComponent = (
                childrenProps: React.ReactElement<any>,
                route: string
              ) => (
                <Link useAnchorTag={true} href={route}>
                  {childrenProps}
                </Link>
              );
              return (
                <ArticlesSection>
                  {queryProps.data.searchArticles.content.map(
                    article =>
                      article && (
                        <ArticleCard
                          key={String(article.id)}
                          id={String(article.id)}
                          version={Number(article.version)}
                          cardHeight={420}
                          imageURL={
                            article.attributes && article.attributes.background
                          }
                          linkComponent={linkComponent}
                          title={String(article.title)}
                          content={String(article.content)}
                          date={`${moment(article.datePublished).fromNow()}`}
                          username={name}
                          userAvatar={avatar}
                          userId={id}
                          resourceType="community"
                        />
                      )
                  )}
                </ArticlesSection>
              );
            } else {
              return (
                <ArticlesSection>
                  <Empty />
                </ArticlesSection>
              );
            }
          }
        }}
      </Query>
    </section>
  );
};

export default Container;
