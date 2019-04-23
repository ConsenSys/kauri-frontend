// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import CheckpointArticles from "../../CheckpointArticles";
import withPagination from "../../../../lib/with-pagination";
import PublicProfileEmptyState from "../../../../../kauri-components/components/PublicProfileEmptyState";
import { BodyCard } from "../../../../../kauri-components/components/Typography";

import Masonry from "../../../../../kauri-components/components/Layout/Masonry";

import type { ArticlesProps } from "../types";

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 100px;
`;

const Articles = ({
  data,
  type,
  routeChangeAction,
  isOwner,
  isLoggedIn,
}: ArticlesProps) => {
  const articles = data.searchArticles && data.searchArticles.content;
  return articles.length > 0 ? (
    <Fragment>
      {typeof type === "string" && type === "published" && isOwner && (
        <CheckpointArticles isOwner={isOwner} articles={articles} />
      )}
      <Masonry withPadding={false}>
        {articles.map(article => (
          <ArticleCard
            key={`${article.id}-${article.version}`}
            changeRoute={routeChangeAction}
            tags={article.tags}
            date={article.dateCreated}
            title={article.title}
            description={article.description}
            userId={article.author && article.author.id}
            username={article.author && article.author.username}
            userAvatar={article.author && article.author.avatar}
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
    </Fragment>
  ) : (
    <Centered>
      <PublicProfileEmptyState
        moveIconLeftBecauseCSS
        iconSrc={"/static/images/icons/no-submitted-updates.svg"}
        description={
          <DescriptionContainer>
            <BodyCard>
              If you think of an improvement to another user's article, you can
              suggest edits by clicking "Update Article".
            </BodyCard>
            <BodyCard>
              They'll then be asked to approve or reject (giving a reason) your
              edits.
            </BodyCard>
            <BodyCard>Your pending submitted edits will appear here.</BodyCard>
          </DescriptionContainer>
        }
        title="No Submitted Updates"
      />{" "}
    </Centered>
  );
};

export default withPagination(Articles, "searchArticles");
