// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import ContentContainer from "../PublicProfileContentContainer";
import CheckpointArticles from "../../CheckpointArticles";
import withPagination from "../../../../lib/with-pagination";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";
import PublicProfileEmptyState from "../../../../../kauri-components/components/PublicProfileEmptyState";
import { BodyCard } from "../../../../../kauri-components/components/Typography";

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
              tags={article.tags}
              changeRoute={routeChangeAction}
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
        iconSrc={"/static/images/icons/no-articles-for-approval.svg"}
        description={
          <DescriptionContainer>
            <BodyCard>
              If another user on Kauri suggests edits to one of your published
              articles, you'll be asked to approve or reject them.
            </BodyCard>
            <BodyCard>
              These pending edits will appear here until you do so.
            </BodyCard>
          </DescriptionContainer>
        }
        title="No Articles For Approval"
      />
    </Centered>
  );
};

export default withPagination(Articles, "searchArticles");
