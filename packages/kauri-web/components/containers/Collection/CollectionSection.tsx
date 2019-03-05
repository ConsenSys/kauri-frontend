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
import {
  Article,
  Article_owner_PublicUserDTO,
  Article_owner_CommunityDTO,
} from "../../../queries/__generated__/Article";

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

interface IProps {
  articles: Article[];
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
    const linkComponent = (article: Article) => (
      childrenProps: React.ReactElement<any>,
      route: string
    ) => (
      <Link
        useAnchorTag={true}
        toSlug={
          route && route.includes("article") ? String(article.title) : undefined
        }
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
          {articles.map((article: Article) => {
            const owner = article.owner as
              | Article_owner_PublicUserDTO
              | Article_owner_CommunityDTO;
            return (
              <ArticleCard
                key={String(article.id)}
                id={String(article.id)}
                version={Number(article.version)}
                description={article.description}
                date={article.datePublished}
                title={String(article.title)}
                username={
                  (owner &&
                  owner.resourceIdentifier &&
                  owner.resourceIdentifier.type &&
                  owner.resourceIdentifier.type.toLowerCase() === "community"
                    ? owner && owner.name
                    : owner &&
                      (owner as Article_owner_PublicUserDTO).username) || null
                }
                userId={
                  owner
                    ? typeof owner.id === "string"
                      ? owner.id
                      : "Anoymous"
                    : "Anonymous"
                }
                userAvatar={(owner && owner.avatar) || null}
                nfts={article.associatedNfts}
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
                                  articleId={String(article.id)}
                                  version={Number(article.version)}
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
            );
          })}
        </ArticlesSection>
      </Container>
    );
  }
  return <Empty />;
};

export default Component;
