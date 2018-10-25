import React from 'react'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard'
import ChooseArticleContent from '../../../../kauri-components/components/Modal/ChooseArticleContent'
import moment from 'moment'

export default ({
  chooseArticle,
  viewArticle,
  chosenArticles,
  data: {
    searchArticles: { content },
  },
}) =>
  content.length > 0 ? (
    <ChooseArticleContent>
      {content.map(article => (
        <ArticleCard
          key={article.id + article.version}
          id={article.id}
          version={article.version}
          content={article.content}
          date={moment(article.datePublished).format('D MMM YYYY')}
          title={article.title}
          username={article.owner && article.owner.username}
          userAvatar={article.owner && article.owner.avatar}
          userId={article.owner && article.owner.id}
          imageURL={article.attributes && article.attributes.background}
          cardHeight={420}
          hoverAction={article => chooseArticle(article)}
          viewAction={({ id, version }) => window.open(`${window.location.origin}/article/${id}/v${version}`, '_blank')}
          isChosenArticle={!!chosenArticles.find(({ id, version }) => article.id === id && article.version === version)}
        />
      ))}
    </ChooseArticleContent>
  ) : (
    <p>You have no published articles!</p>
  )

//   linkComponent?: (React.Node, string) => React.Node,
//   pageType?: PageType,
//   hoverAction?: { id: string, content: string } => void,
//   viewAction?: { id: string, version: string } => void,
//   isChosenArticle?: boolean,
// }
