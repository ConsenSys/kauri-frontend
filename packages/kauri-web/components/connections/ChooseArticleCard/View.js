import React from 'react'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard'
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
    content.map(article => (
      <ArticleCard
        key={article.id + article.version}
        id={article.id}
        version={article.version}
        content={article.content}
        date={moment(article.datePublished).format('D MMM YYYY')}
        title={article.title}
        username={article.author && article.author.username}
        userAvatar={article.author && article.author.avatar}
        userId={article.author.id}
        imageURL={article.attributes && article.attributes.background}
        cardHeight={420}
        hoverAction={article => chooseArticle(article)}
        viewAction={({ id, version }) => window.open(`${window.location.origin}/article/${id}/v${version}`, '_blank')}
        isChosenArticle={chosenArticles.find(({ id, version }) => article.id === id && article.version === version)}
      />
    ))
  ) : (
    <p>You have no published articles!</p>
  )

//   linkComponent?: (React.Node, string) => React.Node,
//   pageType?: PageType,
//   hoverAction?: { id: string, content: string } => void,
//   viewAction?: { id: string, version: string } => void,
//   isChosenArticle?: boolean,
// }
