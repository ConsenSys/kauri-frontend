// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import ContentContainer from "../PublicProfileContentContainer";
import CheckpointArticles from "../../CheckpointArticles";
import withPagination from "../../../../lib/with-pagination";
import {
  PrimaryButton,
  MediumImportButton,
} from "../../../../../kauri-components/components/Button";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";
import PublicProfileEmptyState from "../../../../../kauri-components/components/PublicProfileEmptyState";
import { BodyCard } from "../../../../../kauri-components/components/Typography";
import AddToCollectionConnection from "../../../connections/AddToCollection/index";

import type { ArticlesProps } from "../types";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.paddingTop};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Articles = ({
  data,
  type,
  routeChangeAction,
  isLoggedIn,
  isOwner,
  openModalAction,
}: ArticlesProps) => {
  const articles = data.searchArticles && data.searchArticles.content;
  return articles.length > 0 ? (
    <Fragment>
      {typeof type === "string" && type === "published" && isOwner && (
        <CheckpointArticles isOwner={isOwner} articles={articles} />
      )}
      <ContentContainer>
        <Masonry columns={4} minWidth={310}>
          {articles.map(article => (
            <ArticleCard
              key={`${article.id}-${article.version}`}
              changeRoute={routeChangeAction}
              date={article.datePublished}
              title={article.title}
              description={article.description}
              tags={article.tags}
              userId={
                type !== "toBeApproved" && article.owner
                  ? article.owner.id
                  : article.author.id
              }
              username={
                type !== "toBeApproved" && article.owner
                  ? article.owner.username
                  : article.author.username
              }
              userAvatar={
                type !== "toBeApproved" && article.owner
                  ? article.owner.avatar
                  : article.author.avatar
              }
              isLoggedIn={isLoggedIn}
              hoverChildren={({ hideDispatch }) => (
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
              )}
              id={article.id}
              version={article.version}
              cardHeight={420}
              imageURL={article.attributes && article.attributes.background}
              nfts={article.associatedNfts}
              linkComponent={(childrenProps, route) => (
                <Link
                  toSlug={route && route.includes("article") && article.title}
                  useAnchorTag
                  href={route}
                >
                  {childrenProps}
                </Link>
              )}
            />
          ))}
        </Masonry>
      </ContentContainer>
    </Fragment>
  ) : (
    <Centered>
      <PublicProfileEmptyState
        iconSrc={"/static/images/icons/no-published-articles.svg"}
        description={
          isLoggedIn ? (
            <DescriptionContainer>
              <BodyCard>
                Any articles you've published on Kauri will appear here.
              </BodyCard>
              <BodyCard>
                Get started by creating a new draft below, or importing one
                you've written on Medium!
              </BodyCard>
              <BodyCard>
                Your draft articles will be shown in the next tab until you
                publish them.
              </BodyCard>
            </DescriptionContainer>
          ) : (
            "The user hasn't published any articles yet. Once they do, they will appear here!"
          )
        }
        title="No Articles Published"
        secondaryButton={isOwner ? <MediumImportButton border /> : null}
        primaryButton={
          isOwner ? (
            <PrimaryButton onClick={() => routeChangeAction("/write-article")}>
              Create Article
            </PrimaryButton>
          ) : null
        }
      />
    </Centered>
  );
};

export default withPagination(Articles, "searchArticles");
