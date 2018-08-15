// @flow
import React from 'react'
import ApprovedArticle from './ApprovedArticle/View'
import InReviewArticle from './InReviewArticle/View'

import type { DeleteArticleCommentPayload } from './Module'
import type { AddCommentPayload } from '../AddCommentForm/Module'

type ArticleProps = {
  article_id: string,
  data: {
    getArticle: ArticleDTO,
  },
  approveArticleAction: any => void,
  routeChangeAction: string => void,
  rejectArticleAction: (string, string) => void,
  addCommentAction: (AddCommentPayload, callback: any) => void,
  personalUsername: ?string,
  deleteArticleCommentAction: DeleteArticleCommentPayload => void,
  publishArticleAction: any => void,
}

class Article extends React.Component<ArticleProps> {
  approveArticle = () => {
    if (typeof this.props.data.getArticle === 'object') {
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

  rejectArticle = () =>
    this.props.rejectArticleAction(this.props.data.getArticle.article_id, this.props.data.getArticle.article_version)

  updateUnsubmittedArticle = () => {
    if (this.props.routeChangeAction) {
      if (this.props.data.getArticle && typeof this.props.data.getArticle.article_id === 'string') {
        this.props.routeChangeAction(
          `/article/${this.props.data.getArticle.article_id}/article-version/${
            this.props.data.getArticle.article_version
          }/update-article`
        )
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
          this.props.routeChangeAction(
            `/article/${this.props.data.getArticle.article_id}/article-version/${
              this.props.data.getArticle.article_version
            }/article-approved`
          )
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

  publishArticle = () => {
    if (typeof this.props.data.getArticle === 'object') {
      console.log(this.props.data.getArticle)
      if (
        typeof this.props.data.getArticle.article_id === 'string' &&
        typeof this.props.data.getArticle.article_version === 'number' &&
        typeof this.props.data.getArticle.content_hash === 'string' &&
        typeof this.props.data.getArticle.category === 'string' &&
        typeof this.props.data.getArticle.user_id === 'string' &&
        typeof this.props.data.getArticle.signature === 'string'
      ) {
        const {
          article_id,
          article_version,
          content_hash,
          category,
          user_id,
          signature,
          request_id,
        } = this.props.data.getArticle
        // TODO FIX ROUTE MATCHING FOR CONFIRMATION PAGE VS ID
        const publishArticlePayload = {
          article_id,
          article_version,
          request_id: request_id || '',
          content_hash,
          category,
          user_id,
          signature,
        }
        console.log('publishArticlePayload, ', publishArticlePayload)
        this.props.publishArticleAction(publishArticlePayload)
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
        approveArticle={this.approveArticle}
        rejectArticle={this.rejectArticle}
        preApproveArticle={this.preApproveArticle}
        addCommentAction={this.props.addCommentAction}
        personalUsername={this.props.personalUsername}
        deleteArticleComment={this.deleteArticleComment}
        publishArticle={this.publishArticle}
      />
    )
  }
}

export default Article
