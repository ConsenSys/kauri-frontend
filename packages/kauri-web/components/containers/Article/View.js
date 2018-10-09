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
  approveArticle = () => {
    const articleData = this.props.data && this.props.data.getArticle;
    if (!articleData) return console.log('there was an error');
    const { id, version, contentHash, author, dateCreated} = articleData;
    return this.props.approveArticleAction({ id, version, author: author.id, contentHash, dateCreated});
  }

  rejectArticle = () => {
    const articleData = this.props.data && this.props.data.getArticle;
    if (!articleData) return console.log('there was an error');
    const { id, version, contentHash, author, dateCreated} = articleData;
    console.log(id, version, "cause");
    return this.props.rejectArticleAction({ id, version, cause: "Unfortunately this update was rejected by the owner"});
  }

  updateUnsubmittedArticle = () => {
    if (this.props.routeChangeAction) {
      if (this.props.data.getArticle && typeof this.props.data.getArticle.id === 'string') {
        this.props.routeChangeAction(
          `/article/${this.props.data.getArticle.id}/v${
            this.props.data.getArticle.version
          }/update-article`
        )
      }
    }
  }

  preApproveArticle = () => {
    if (this.props.data.getArticle) {
      if (
        typeof this.props.data.getArticle.text === 'string' &&
        typeof this.props.data.getArticle.id === 'string'
      ) {
        const preApproveArticlePayload: AddCommentPayload = {
          id: this.props.data.getArticle.id,
          comment: `I've reviewed your article, and everything looks good. 
          Please "Submit for publishing" and it will be published soon!`,
        }

        this.props.addCommentAction(preApproveArticlePayload, () =>
          this.props.routeChangeAction(
            `/article/${this.props.data.getArticle.id}/v${
              this.props.data.getArticle.version
            }/article-approved`
          )
        )
      }
    }
  }

  deleteArticleComment = (comment_id: number) => {
    if (this.props.data.getArticle) {
      if (typeof this.props.data.getArticle.id === 'string' && typeof comment_id === 'number') {
        const deleteArticleCommentPayload: DeleteArticleCommentPayload = {
          comment_id,
          id: this.props.data.getArticle.id,
        }
        this.props.deleteArticleCommentAction(deleteArticleCommentPayload)
      }
    }
  }

  publishArticle = () => {
    if (typeof this.props.data.getArticle === 'object') {
      console.log(this.props.data.getArticle)
      if (
        typeof this.props.data.getArticle.id === 'string' &&
        typeof this.props.data.getArticle.version === 'number' &&
        typeof this.props.data.getArticle.contentHash === 'string' &&
        typeof this.props.data.getArticle.dateCreated === 'string' &&
        typeof this.props.data.getArticle.authorId === 'string'
      ) {
        const {
          id,
          version,
          contentHash,
          dateCreated,
          authorId,
          owner,
        } = this.props.data.getArticle
        // TODO FIX ROUTE MATCHING FOR CONFIRMATION PAGE VS ID
        const publishArticlePayload = {
          id,
          version,
          contentHash,
          dateCreated,
          contributor: authorId,
          owner,
        }
        console.log('publishArticlePayload, ', publishArticlePayload)
        this.props.publishArticleAction(publishArticlePayload)
      }
    }
  }

  render () {
    if (!this.props.data && !this.props.data.getArticle) return
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
