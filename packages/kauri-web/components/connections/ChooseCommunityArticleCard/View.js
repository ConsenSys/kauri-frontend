import React from "react";
import styled from "styled-components";
import R from "ramda";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import ChooseArticleContent, {
  Content,
} from "../../../../kauri-components/components/Modal/ChooseArticleContent";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";
import Tabs from "../../../../kauri-components/components/Tabs";
import withPagination from "../../../lib/with-pagination";
import Loading from "../../common/Loading";

const Container = styled.div`
  display: flex;
  flex-diretion: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;

  ${Content} {
    padding-top: 10px;
  }
`;

const ArticlesContent = props => {
  const {
    chooseArticle,
    chosenArticles,
    articles,
    userId,
    setRef,
    allOtherChosenArticles,
  } = props;
  if (!articles) {
    return null;
  }

  return articles &&
    Array.isArray(articles.content) &&
    articles.content.length > 0 ? (
      <Container>
        <ChooseArticleContent setRef={setRef}>
          {articles.content.map(({ resource: article }) => {
            if (allOtherChosenArticles) {
              if (
                allOtherChosenArticles.find(chosenArticle => {
                  if (chosenArticle.resourcesId) {
                    return chosenArticle.resourcesId.find(
                      ({ id, version }) => id === article.id
                    );
                  }
                  return chosenArticle.id === article.id;
                })
              ) {
                return null;
              }
            }

            const ownerType =
            article.owner &&
            article.owner.__typename.split("DTO")[0].toUpperCase();

            function getContributorOrOwnerField (field) {
              return R.path(["contributors", "0"])(article)
                ? R.path(["contributors", "0", field])(article)
                : R.path(["owner", field])(article);
            }

            return (
              <ArticleCard
                key={article.id + article.version}
                id={article.id}
                version={article.version}
                description={article.description}
                date={article.datePublished}
                title={article.title}
                username={
                  (getContributorOrOwnerField("username") ||
                ownerType === "COMMUNITY"
                    ? getContributorOrOwnerField("name")
                    : getContributorOrOwnerField("username")) || null
                }
                userId={getContributorOrOwnerField("id") || ""}
                userAvatar={getContributorOrOwnerField("avatar") || null}
                resourceType={
                  (R.path(["contributors", "0"])(article) ? "USER" : ownerType) ||
                "USER"
                }
                imageURL={article.attributes && article.attributes.background}
                cardHeight={310}
                isLoggedIn={!!userId}
                linkComponent={children => children}
                tags={article.tags}
                hoverChildren={({ hideDispatch }) => (
                  <React.Fragment>
                    <PrimaryButton
                      onClick={() => {
                        chooseArticle({
                          id: article.id,
                          version: article.version,
                        });
                        hideDispatch();
                      }}
                    >
                    Choose
                    </PrimaryButton>
                    <SecondaryButton
                      onClick={() =>
                        window.open(
                          `${window.location.origin}/article/${article.id}/v${
                            article.version
                          }`,
                          "_blank"
                        )
                      }
                    >
                    View
                    </SecondaryButton>
                  </React.Fragment>
                )}
                triggerHoverChildrenOnFullCardClick
                isChosenArticle={
                  !!chosenArticles.find(
                    ({ id, version }) =>
                      article.id === id && article.version === version
                  )
                }
              />
            );
          })}
        </ChooseArticleContent>
      </Container>
    ) : (
      <p>You have no community published articles!</p>
    );
};

const CommunityPublishedArticles = withPagination(
  ArticlesContent,
  "getCommunityContent",
  "searchCommunityPublishedArticles"
);

const ChooseArticleCardComponent = props => {
  if (
    (props.searchCommunityPublishedArticles &&
      props.searchCommunityPublishedArticles.loading) ||
    !props.searchCommunityPublishedArticles
  ) {
    return <Loading />;
  }

  return (
    <Tabs
      centerTabs
      passChangeTabFunction={props.passChangeTabFunction}
      tabs={[
        {
          name: "Community articles",
        },
      ]}
      panels={[
        <CommunityPublishedArticles
          {...props}
          articles={props.searchCommunityPublishedArticles.getCommunityContent}
        />,
      ]}
    />
  );
};

export default ChooseArticleCardComponent;
