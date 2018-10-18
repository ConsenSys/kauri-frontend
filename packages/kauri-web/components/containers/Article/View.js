// @flow
import React from 'react'
import ApprovedArticle from './ApprovedArticle/View'
import InReviewArticle from './InReviewArticle/View'

import type { DeleteArticleCommentPayload } from './Module'
import type { AddCommentPayload } from '../AddCommentForm/Module'

type ArticleProps = {
  id: string,
  data: {
    getArticle: ArticleDTO,
  },
  approveArticleAction: any => void,
  routeChangeAction: string => void,
  rejectArticleAction: ({ id: string, version: number, cause: string }) => void,
  addCommentAction: (AddCommentPayload, callback: any) => void,
  personalUsername: ?string,
  deleteArticleCommentAction: DeleteArticleCommentPayload => void,
  publishArticleAction: any => void,
  hostName: string,
}

class Article extends React.Component<ArticleProps> {
  render () {
    if (!this.props.data && !this.props.data.getArticle) return
    return <ApprovedArticle {...this.props} />
  }
}

export default Article
