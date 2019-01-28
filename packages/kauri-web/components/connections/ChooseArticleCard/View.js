import React from "react";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import ChooseArticleContent from "../../../../kauri-components/components/Modal/ChooseArticleContent";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";

export default ({
  chooseArticle,
  viewArticle,
  chosenArticles,
  data: {
    searchArticles: { content },
  },
  userId,
  setRef,
}) =>
  content.length > 0 ? (
    <ChooseArticleContent setRef={setRef}>
      {content.map(article => {
        return (
          <ArticleCard
            key={article.id + article.version}
            id={article.id}
            version={article.version}
            content={article.content}
            date={article.datePublished}
            title={article.title}
            username={article.owner && article.owner.username}
            userAvatar={article.owner && article.owner.avatar}
            userId={article.owner && article.owner.id}
            imageURL={article.attributes && article.attributes.background}
            cardHeight={420}
            isLoggedIn={!!userId}
            linkComponent={children => children}
            nfts={article.attributes && article.attributes.nfts}
            tags={article.tags}
            hoverChildren={({ hideDispatch }) => (
              <React.Fragment>
                <PrimaryButton
                  onClick={() => {
                    chooseArticle({ id: article.id, version: article.version });
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
  ) : (
    <p>You have no published articles!</p>
  );

//   linkComponent?: (React.Node, string) => React.Node,
//   pageType?: PageType,
//   hoverAction?: { id: string, content: string } => void,
//   viewAction?: { id: string, version: string } => void,
//   isChosenArticle?: boolean,
// }
