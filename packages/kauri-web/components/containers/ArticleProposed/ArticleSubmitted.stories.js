// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ArticleSubmitted from './View'
import moment from 'moment'

const articleMock: ArticleDTO = {
  category: 'metamask',
  dead_line: moment().add(7, 'day'),
  subject: 'Managing tokens',
  request_id: 'rwfsdgfd',
}

storiesOf('ArticleSubmitted', module).add('Example', () => (
  <ArticleSubmitted data={{ getArticle: articleMock, getRequest: { bounty: 0.01 } }} />
))
