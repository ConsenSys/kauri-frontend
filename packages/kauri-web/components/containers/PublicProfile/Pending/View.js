// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import ContentContainer from "../PublicProfileContentContainer";
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
  margin-top: ${props => props.theme.paddingTop};
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
      <ContentContainer>
        <Masonry columns={4} minWidth={310}>
          {articles.map(article => (
            <ArticleCard
              key={`${article.id}-${article.version}`}
              changeRoute={routeChangeAction}
              tags={article.tags}
              date={article.dateCreated}
              title={article.title}
              content={article.content}
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
              id={article.id}
              version={article.version}
              cardHeight={420}
              imageURL={article.attributes && article.attributes.background}
              nfts={article.associatedNfts}
              linkComponent={(childrenProps, route) => (
                <Link
                  toSlug={route.includes("article") && article.title}
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
