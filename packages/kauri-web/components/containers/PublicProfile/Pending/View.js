// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import Empty from "../Empty";
import { Link } from "../../../../routes";
import ContentContainer from "../PublicProfileContentContainer";
import CheckpointArticles from "../../CheckpointArticles";
import withPagination from "../../../../lib/with-pagination";

import { PrimaryButton } from "../../../../../kauri-components/components/Button";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";

import type { ArticlesProps } from "../types";

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
              nfts={article.attributes && article.attributes.nfts}
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
    <Empty>
      <PrimaryButton onClick={() => routeChangeAction(`/write-article`)}>
        WRITE ARTICLE
      </PrimaryButton>
    </Empty>
  );
};

export default withPagination(Articles, "searchArticles");
