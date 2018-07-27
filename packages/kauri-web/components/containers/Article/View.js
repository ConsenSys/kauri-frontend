// @flow
import React from 'react'
import ApprovedArticle from './ApprovedArticle/View'
import InReviewArticle from './InReviewArticle/View'

import type { SubmitFinalisedArticlePayload, DeleteArticleCommentPayload } from './Module'
import type { AddCommentPayload } from '../AddCommentForm/Module'

type ArticleProps = {
  article_id: string,
  data: {
    getArticle: ArticleDTO,
  },
  approveArticleAction: ApproveArticlePayload => void,
  submitFinalisedArticleAction: SubmitFinalisedArticlePayload => void,
  routeChangeAction: string => void,
  rejectArticleAction: string => void,
  addCommentAction: (AddCommentPayload, callback: any) => void,
  personalUsername: ?string,
  deleteArticleCommentAction: DeleteArticleCommentPayload => void,
}

class Article extends React.Component<ArticleProps> {
  approveArticle = () => {
    console.log('CLICKED APPROVE ARTICLE')
    if (typeof this.props.data.getArticle === 'object') {
      console.log('getArticle exists')
      if (
        typeof this.props.data.getArticle.article_id === 'string' &&
        typeof this.props.data.getArticle.article_version === 'number' &&
        typeof this.props.data.getArticle.user_id === 'string' &&
        typeof this.props.data.getArticle.category === 'string' &&
        typeof this.props.data.getArticle.content_hash === 'string' &&
        typeof this.props.data.getArticle.request_id === 'string'
      ) {
        const approveArticlePayload = {
          article_id: this.props.data.getArticle.article_id,
          article_version: this.props.data.getArticle.article_version,
          user_id: this.props.data.getArticle.user_id,
          category: this.props.data.getArticle.category,
          content_hash: this.props.data.getArticle.content_hash,
          request_id: this.props.data.getArticle.request_id,
        }

        console.log(approveArticlePayload)
        this.props.approveArticleAction(approveArticlePayload)
      } else if (
        typeof this.props.data.getArticle.article_id === 'string' &&
        typeof this.props.data.getArticle.article_version === 'number' &&
        typeof this.props.data.getArticle.user_id === 'string' &&
        typeof this.props.data.getArticle.category === 'string' &&
        typeof this.props.data.getArticle.content_hash === 'string'
      ) {
        const approveArticlePayload = {
          article_id: this.props.data.getArticle.article_id,
          article_version: this.props.data.getArticle.article_version,
          user_id: this.props.data.getArticle.user_id,
          category: this.props.data.getArticle.category,
          content_hash: this.props.data.getArticle.content_hash,
          request_id: '',
        }

        console.log(approveArticlePayload)
        this.props.approveArticleAction(approveArticlePayload)
      }
    }
  }

  submitFinalisedArticle = () => {
    if (this.props.data.getArticle) {
      if (
        this.props.data.getArticle.versions &&
        typeof this.props.data.getArticle.article_id === 'string' &&
        typeof this.props.data.getArticle.request_id === 'string' &&
        typeof this.props.data.getArticle.category === 'string' &&
        typeof this.props.data.getArticle.user_id === 'string' &&
        typeof this.props.data.getArticle.content_hash === 'string'
      ) {
        const submitFinalisedArticlePayload: SubmitFinalisedArticlePayload = {
          article_id: this.props.data.getArticle.article_id,
          request_id: this.props.data.getArticle.request_id,
          content_hash: this.props.data.getArticle.content_hash,
          category: this.props.data.getArticle.category,
          user_id: this.props.data.getArticle.user_id,
        }

        this.props.submitFinalisedArticleAction(submitFinalisedArticlePayload)
      } else if (
        typeof this.props.data.getArticle.article_id === 'string' &&
        typeof this.props.data.getArticle.category === 'string' &&
        typeof this.props.data.getArticle.user_id === 'string' &&
        typeof this.props.data.getArticle.content_hash === 'string'
      ) {
        const submitFinalisedArticlePayload: SubmitFinalisedArticlePayload = {
          article_id: this.props.data.getArticle.article_id,
          request_id: '',
          content_hash: this.props.data.getArticle.content_hash,
          category: this.props.data.getArticle.category,
          user_id: this.props.data.getArticle.user_id,
        }

        this.props.submitFinalisedArticleAction(submitFinalisedArticlePayload)
      }
    }
  }

  rejectArticle = () => this.props.rejectArticleAction(this.props.data.getArticle.article_id)

  updateUnsubmittedArticle = () => {
    if (this.props.routeChangeAction) {
      if (this.props.data.getArticle && typeof this.props.data.getArticle.article_id === 'string') {
        this.props.routeChangeAction(`/article/${this.props.data.getArticle.article_id}/update-article`)
      }
    }
  }

  preApproveArticle = () => {
    if (this.props.data.getArticle) {
      if (
        typeof this.props.data.getArticle.text === 'string' &&
        typeof this.props.data.getArticle.article_id === 'string'
      ) {
        const preApproveArticlePayload: AddCommentPayload = {
          article_id: this.props.data.getArticle.article_id,
          comment: `I've reviewed your article, and everything looks good. 
          Please "Submit for publishing" and it will be published soon!`,
        }

        this.props.addCommentAction(preApproveArticlePayload, () =>
          this.props.routeChangeAction(`/article/${this.props.data.getArticle.article_id}/article-approved`)
        )
      }
    }
  }

  deleteArticleComment = (comment_id: number) => {
    if (this.props.data.getArticle) {
      if (typeof this.props.data.getArticle.article_id === 'string' && typeof comment_id === 'number') {
        const deleteArticleCommentPayload: DeleteArticleCommentPayload = {
          comment_id,
          article_id: this.props.data.getArticle.article_id,
        }
        this.props.deleteArticleCommentAction(deleteArticleCommentPayload)
      }
    }
  }

  render () {
    return this.props.data && this.props.data.getArticle && this.props.data.getArticle.status === 'PUBLISHED' ? (
      <ApprovedArticle {...this.props} />
    ) : (
      <InReviewArticle
        {...this.props}
        updateUnsubmittedArticle={this.updateUnsubmittedArticle}
        submitFinalisedArticle={this.submitFinalisedArticle}
        approveArticle={this.approveArticle}
        rejectArticle={this.rejectArticle}
        preApproveArticle={this.preApproveArticle}
        addCommentAction={this.props.addCommentAction}
        personalUsername={this.props.personalUsername}
        deleteArticleComment={this.deleteArticleComment}
      />
    )
  }
}

export default Article
