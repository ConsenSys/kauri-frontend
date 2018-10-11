// @flow
import React from 'react'
import styled from 'styled-components'
import { checkpointArticlesAction } from './Module'

type Props = {
  articles: Array<ArticleDTO>
}
export default ({ articles, checkpointArticlesAction }: Props) =>
  <div>
    <button onClick={() => checkpointArticlesAction()}>Checkpoint dat shit</button>
    {articles.length > 0
      ? articles.find((article) => !article.checkpoint)
        ? 'One or more of your articles is not on the mainchain!'
        : 'All your articles is on the mainchain' : null}
  </div>
