// @flow
import React, { Fragment } from "react";
import styled from "styled-components";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import Empty from "../Empty";
import { Link } from "../../../../routes";
import ContentContainer from "../PublicProfileContentContainer";
import withPagination from "../../../../lib/with-pagination";

import { PrimaryButton } from "../../../../../kauri-components/components/Button";
import AlertView from "../../../../../kauri-components/components/Modal/AlertView";
import { BodyCard } from "../../../../../kauri-components/components/Typography";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";

import type { ArticlesProps } from "../types";

const Articles = ({
  data,
  type,
  routeChangeAction,
  isLoggedIn,
  closeModalAction,
  deleteDraftArticleAction,
  openModalAction,
}: ArticlesProps & {
  isLoggedIn: boolean,
}) => {
  const articles = data.searchArticles && data.searchArticles.content;
  return articles.length > 0 ? (
    <Fragment>
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
              status={"DRAFT"}
              isLoggedIn={isLoggedIn}
              hoverChildren={() => (
                <PrimaryButton
                  onClick={() =>
                    openModalAction({
                      children: (
                        <AlertView
                          closeModalAction={() => closeModalAction()}
                          confirmButtonAction={() =>
                            deleteDraftArticleAction(
                              { id: article.id, version: article.version },
                              closeModalAction
                            )
                          }
                          content={
                            <div>
                              <BodyCard>
                                You won't be able to retrieve the draft article
                                after deleting.
                              </BodyCard>
                            </div>
                          }
                          title={"Are you sure?"}
                        />
                      ),
                    })
                  }
                >
                  Delete draft
                </PrimaryButton>
              )}
            />
          ))}
        </Masonry>
      </ContentContainer>
    </Fragment>
  ) : (
    <Empty>
      <PrimaryButton onClick={() => routeChangeAction("/write-article")}>
        WRITE ARTICLE
      </PrimaryButton>
    </Empty>
  );
};

export default withPagination(Articles, "searchArticles");
