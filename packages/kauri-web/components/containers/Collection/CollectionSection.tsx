import * as React from "react";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import Empty from "../PublicProfile/Empty";
import {
  Title2,
  PageDescription,
} from "../../../../kauri-components/components/Typography";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import AddToCollectionConnection from "../../connections/AddToCollection/index";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const ArticlesSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

const StyledTitle = styled(Title2)`
  margin-top: ${props => props.theme.space[3]}px;
`;

const StyledDescription = styled(PageDescription)`
  margin-bottom: ${props => props.theme.space[3]}px;
`;

interface IOwner {
  avatar: string | null;
  id: string;
  username: string | null;
}

interface IArticle {
  associatedNfts: any[] | null;
  attributes: { background: string | null } | null;
  content: string;
  datePublished: string;
  id: string;
  imageURL: string | null;
  owner: IOwner;
  tags: string[] | null;
  title: string;
  version: number;
}

interface IProps {
  articles: IArticle[];
  currentUser: string | null;
  description: string | null;
  isLoggedIn: boolean;
  isOwnedByCurrentUser: boolean;
  name: string;
  openModalAction: any;
}

const Component: React.SFC<IProps> = props => {
  const {
    name,
    description,
    articles,
    isLoggedIn,
    openModalAction,
    isOwnedByCurrentUser,
  } = props;
  if (articles) {
    const linkComponent = (article: IArticle) => (
      childrenProps: React.ReactElement<any>,
      route: string
    ) => (
      <Link
        useAnchorTag={true}
        toSlug={route.includes("article") ? String(article.title) : undefined}
        href={route}
      >
        {childrenProps}
      </Link>
    );

    return (
      <Container>
        <StyledTitle>{name}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        <ArticlesSection>
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              id={article.id}
              version={article.version}
              content={article.content}
              date={article.datePublished}
              title={article.title}
              username={article.owner && article.owner.username}
              userId={article.owner && article.owner.id}
              userAvatar={article.owner && article.owner.avatar}
              nfts={article.associatedNfts || []}
              tags={article.tags as string[]}
              imageURL={
                (article.attributes &&
                  typeof article.attributes.background === "string" &&
                  article.attributes.background) ||
                null
              }
              linkComponent={linkComponent(article)}
              resourceType={"USER"}
              cardHeight={420}
              isLoggedIn={isLoggedIn}
              hoverChildren={
                isOwnedByCurrentUser
                  ? null
                  : () => (
                      <PrimaryButton
                        onClick={() =>
                          openModalAction({
                            children: (
                              <AddToCollectionConnection
                                articleId={article.id}
                                version={article.version}
                              />
                            ),
                          })
                        }
                      >
                        Add To Collection
                      </PrimaryButton>
                    )
              }
            />
          ))}
        </ArticlesSection>
      </Container>
    );
  }
  return <Empty />;
};

export default Component;
