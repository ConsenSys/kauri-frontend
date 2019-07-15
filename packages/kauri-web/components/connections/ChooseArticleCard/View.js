import React from "react";
import styled from "styled-components";
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

  return articles && articles.content.length > 0 ? (
    <Container>
      <ChooseArticleContent setRef={setRef}>
        {articles.content.map(article => {
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

          return (
            <ArticleCard
              key={article.id + article.version}
              id={article.id}
              version={article.version}
              description={article.description}
              date={article.datePublished}
              title={article.title}
              username={article.owner && article.owner.username}
              userAvatar={article.owner && article.owner.avatar}
              userId={article.owner && article.owner.id}
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
    <p>You have no published articles!</p>
  );
};

const PublishedArticles = withPagination(
  ArticlesContent,
  "searchArticles",
  "searchPublishedArticles"
);
const PersonalPublishedArticles = withPagination(
  ArticlesContent,
  "searchArticles",
  "searchPersonalPublishedArticles"
);

const ChooseArticleCardComponent = props => {
  if (
    (props.searchPublishedArticles && props.searchPublishedArticles.loading) ||
    (props.searchPersonalPublishedArticles &&
      props.searchPersonalPublishedArticles.loading) ||
    (!props.searchPersonalPublishedArticles || !props.searchPublishedArticles)
  ) {
    return <Loading />;
  }

  return (
    <Tabs
      centerTabs
      passChangeTabFunction={props.passChangeTabFunction}
      tabs={[
        {
          name: "My articles",
        },
        !props.hideAllArticlesTab && {
          name: "All articles",
        },
      ]}
      panels={[
        <PersonalPublishedArticles
          {...props}
          articles={props.searchPersonalPublishedArticles.searchArticles}
        />,
        <PublishedArticles
          {...props}
          articles={props.searchPublishedArticles.searchArticles}
        />,
      ]}
    />
  );
};

export default ChooseArticleCardComponent;
