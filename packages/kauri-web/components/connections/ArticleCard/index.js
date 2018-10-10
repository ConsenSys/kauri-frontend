import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { getArticle } from '../../../queries/Article'
import withLoading from '../../../lib/with-loading'
import withApolloError from '../../../lib/with-apollo-error'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard'

const mapStateToProps = state => ({
  hostName: state.app && state.app.hostName,
})

const View = ({ data: { getArticle: article }, cardHeight = 400 }) => (
  <ArticleCard
    key={article.id + article.version}
    id={article.id}
    version={article.version}
    content={article.content}
    date={moment(article.datePublished).format('D MMM YYYY')}
    title={article.title}
    username={article.author.name}
    userId={article.author.id}
    imageURL={article.attributes && article.attributes.background}
    cardHeight={420}
  />
)

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  graphql(getArticle, {
    options: ({ id, version }) => ({
      variables: {
        id,
        version,
      },
    }),
  }),
  withLoading(),
  withApolloError()
)(View)
