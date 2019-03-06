// @flow
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import { Link } from "../../../routes";
import { menuHeaderHeight } from "../Navbar/View";
import {
  Title2,
  BodyCard,
} from "../../../../kauri-components/components/Typography";

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

const SectionContainer = styled.div`
  margin-top: ${props => props.theme.space[3]}px;
  & > h2 {
    margin-bottom: ${props => props.theme.space[1]}px;
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
        <SectionContainer>
          <Title2 color="white">Article Update Submitted</Title2>
          <BodyCard color="white">
            Waiting for original author approval
          </BodyCard>
        </SectionContainer>
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
              toSlug={route && route.includes("article") && article.title}
              useAnchorTag
              href={route}
            >
              {childrenProps}
            </Link>
          )}
          changeRoute={routeChangeAction}
          isLoggedIn={!!userId}
        />
        <SectionContainer>
          <PrimaryButton
            onClick={() =>
              routeChangeAction(`/public-profile/${this.props.userId}`)
            }
          >
            My Articles
          </PrimaryButton>
        </SectionContainer>
      </Container>
    );
  }
}

export default ArticleProposed;
