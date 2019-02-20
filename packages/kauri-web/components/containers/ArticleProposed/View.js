// @flow
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { PossibleActionBadge } from "../../common/ActionBadge";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import { Link } from "../../../routes";
import { menuHeaderHeight } from "../Navbar/View";

type Props = {
  data: { getArticle: ArticleDTO },
  routeChangeAction: string => void,
  userId?: string,
};

const Statement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  > :first-child {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

const ProfileVisibilityStatement = styled(Statement)`
  margin-top: ${props => props.theme.space[2]}px;
  flex-direction: column;
`;

const PossibleActions = styled.div`
  display: flex;
  margin-top: ${props => props.theme.space[3]}px;
  margin-bottom: ${props => props.theme.space[3]}px;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[4]}px;
  }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${menuHeaderHeight}px);
  background-color: ${props => props.theme.primaryTextColor};
  > :first-child {
    margin-bottom: 30px;
  }
`;

class ArticleProposed extends React.Component<Props> {
  render() {
    const { data, routeChangeAction, userId } = this.props;
    const article = this.props.data.getArticle;

    return (
      <Container>
        <Helmet>
          <title>{"Kauri - Article Proposed"}</title>
        </Helmet>
        <ArticleCard
          key={article.id}
          id={article.id}
          version={article.version}
          date={article.datePublished || article.dateCreated}
          title={article.title}
          description={article.description}
          userId={article.author && article.author.id}
          username={article.author && article.author.username}
          userAvatar={article.author && article.author.avatar}
          imageURL={article.attributes && article.attributes.background}
          linkComponent={(childrenProps, route) => (
            <Link
              toSlug={route.includes("article") && article.title}
              useAnchorTag
              href={route}
            >
              {childrenProps}
            </Link>
          )}
          changeRoute={routeChangeAction}
          isLoggedIn={!!userId}
        />
        <Statement>
          <span>is now being reviewed by {data.getArticle.owner.username}</span>
        </Statement>
        <ProfileVisibilityStatement>
          <span>
            It will be visible on your public profile too once approved!
          </span>
          <span>
            {data.getArticle.owner.username} can indicate the article is:
          </span>
        </ProfileVisibilityStatement>
        <PossibleActions>
          <PossibleActionBadge
            action="Approved"
            description="Article will be added to the knowledge base after they approve it"
          />
          <PossibleActionBadge
            action="Changes"
            description="Article requires changes"
          />
          <PossibleActionBadge
            action="Rejected"
            description="Article is not suitable for the knowledgebase"
          />
        </PossibleActions>
        <PrimaryButton
          onClick={() =>
            routeChangeAction(`/public-profile/${this.props.userId}`)
          }
        >
          My Articles
        </PrimaryButton>
      </Container>
    );
  }
}

export default ArticleProposed;
