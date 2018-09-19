// @flow
import React from 'react'
import styled from 'styled-components'
import { Form } from 'antd'
import SubmitArticleFormActions from './SubmitArticleFormActions'
import SubmitArticleFormHeader from './SubmitArticleFormHeader'
import SubmitArticleFormContent from './SubmitArticleFormContent'
import { formatMetadata } from './Module'
import ScrollToTopButton from '../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton'

import type { EditArticlePayload, SubmitArticlePayload } from './Module'
import type { ShowNotificationPayload } from '../../../lib/Module'

type Owner = {
  id: string,
  name: string,
}

type PublishArticlePayload = {
  id: string,
  version: number,
  contentHash: string,
  dateCreated: string,
  contributor: string,
  owner: ?Owner
};

type Props =
  | any
  | {
      draftArticleAction: any => void,
      submitArticleAction: SubmitArticlePayload => void,
      editArticleAction: EditArticlePayload => void,
      publishArticleAction: PublishArticlePayload => void,
      categories: Array<?string>,
      userId: string,
      article_id?: string,
      request_id: string,
      data?: ?{ getArticle?: ArticleDTO },
      article?: any,
      form: any,
      handleFormChange: ({ text: string }) => void,
      routeChangeAction: string => void,
      isKauriTopicOwner: boolean,
      showNotificationAction: ShowNotificationPayload => void,
      username?: ?string,
    }

type SubmitArticleVariables = { subject: string, text: string, owner: ?Owner, sub_category?: string, version?: string }

class SubmitArticleForm extends React.Component<Props> {
  static Header = SubmitArticleFormHeader
  static Actions = SubmitArticleFormActions
  static Content = SubmitArticleFormContent

  getNetwork = async () =>
    new Promise((resolve, reject) => {
      window.web3.version.getNetwork((err, netId) => {
        if (err) {
          reject(err)
        }

        const networkId = netId
        let networkName

        switch (netId) {
          case '1':
            networkName = 'Mainnet'
            break
          case '2':
            networkName = 'Morden'
            break
          case '3':
            networkName = 'Ropsten'
            break
          case '4':
            networkName = 'Rinkeby'
            break
          case '42':
            networkName = 'Kovan'
            break
          case '224895':
            networkName = 'Kauri Dev'
            break
          default:
            networkName = 'Unknown'
        }

        resolve({ networkId: Number(networkId), networkName })
      })
    })

  handleSubmit = (submissionType: string) => (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(
      async (formErr, { text, subject, sub_category, owner, version }: SubmitArticleVariables) => {
        const { networkName } = await this.getNetwork()
        if (networkName !== 'Rinkeby' && networkName !== 'Kauri Dev') {
          return this.props.showNotificationAction({
            notificationType: 'error',
            message: 'Network error!',
            description: 'Please switch to the correct Ethereum network!',
          })
        }
        const { submitArticleAction, editArticleAction, article_id } = this.props
        if (!formErr) {
          if (submissionType === 'submit/update') {
            // if (typeof request_id === 'string') {
            //   if (typeof article_id === 'string') {
            //     return editArticleAction({
            //       request_id: data.getArticle.request_id,
            //       text,
            //       article_id,
            //       article_version: this.props.data.getArticle.article_version,
            //       subject,
            //     })
            //   } else {
            //     return submitArticleAction({
            //       request_id,
            //       text,
            //       subject,
            //       category: data.getRequest.category,
            //       sub_category: data.getRequest.sub_category,
            //       metadata: formatMetadata({ version }),
            //     })
            //   }
            // }
            if (typeof article_id === 'string' && submissionType === 'submit/update') {
              const { id, version, status }: ArticleDTO = this.props.data.getArticle

              if (status === 'PUBLISHED') {
                // Here I am really submitting a new article with updates for an already existing article!
                // Not my published article, I clicked Update article version, I create a new article and self publish it AIO
                return submitArticleAction({
                  id,
                  text,
                  subject,
                  metadata: formatMetadata({ version }),
                  selfPublish: true,
                })
              } else if (status === 'DRAFT') {
                // If I own the article and it's not already published... I can edit it!
                // Draft -> draft
                return editArticleAction({
                  text,
                  article_id,
                  article_version: version,
                  subject,
                  sub_category,
                })
              }
              // else if (currentArticle.status === 'IN_REVIEW') {
              //   // If I own the article and it's not already published... I can edit it!
              //   // Update
              //   return editArticleAction({
              //     text,
              //     article_id,
              //     article_version: currentArticle.version,
              //     subject,
              //     sub_category,
              //   })
              // }
            } else {
              // Fresh article, self publish directly
              return submitArticleAction({
                text,
                subject,
                metadata: formatMetadata({ version }),
                selfPublish: true,
              })
            }
          } else if (submissionType === 'draft') {
            const { id, version }: ArticleDTO = this.props.data.getArticle
            if (this.props.data && this.props.data.getArticle && this.props.data.getArticle.status === 'DRAFT') {
              // Draft -> Draft Version updated

              return editArticleAction({
                text,
                article_id: id,
                article_version: version,
                subject,
                sub_category,
              })
            } else if (this.props.data && this.props.data.getArticle && this.props.data.getArticle.id) {
              const draftArticlePayload = {
                id,
                version,
                subject,
                text,
                metadata: formatMetadata({ version }),
              }
              // console.log('draftArticlePayload', draftArticlePayload)
              this.props.draftArticleAction(draftArticlePayload)
            } else {
              const draftArticlePayload = {
                subject,
                text,
                metadata: formatMetadata({ version }),
              }
              // console.log('draftArticlePayload', draftArticlePayload)
              this.props.draftArticleAction(draftArticlePayload)
            }
          }
        } else {
          Object.keys(formErr).map(errKey =>
            formErr[errKey].errors.map(err =>
              this.props.showNotificationAction({
                notificationType: 'error',
                message: 'Validation error!',
                description: err.message,
              })
            )
          )
          return console.error(formErr)
        }
      }
    )
  }

  render () {
    const { routeChangeAction, isKauriTopicOwner } = this.props

    return (
      <Form>
        <ScrollToTopButton />
        <SubmitArticleForm.Actions
          {...this.props.form}
          categories={this.props.categories}
          handleSubmit={this.handleSubmit}
          routeChangeAction={routeChangeAction}
          text={this.props.data && this.props.data.getArticle && this.props.data.getArticle.content}
          status={this.props.data && this.props.data.getArticle && this.props.data.getArticle.status}
          category={
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.owner && this.props.data.getArticle.owner.id)
            // (this.props.data && this.props.data.getRequest && this.props.data.getRequest.category)
          }
          userId={this.props.userId}
          authorId={this.props.data && this.props.data.getArticle && this.props.data.getArticle.authorId}
        />
        <SubmitArticleForm.Header
          {...this.props.form}
          category={
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.owner && this.props.data.getArticle.owner.id)
            // || (this.props.data && this.props.data.getRequest && this.props.data.getRequest.category)
          }
          subCategory={
            (this.props.data && this.props.data.getRequest && this.props.data.getRequest.sub_category) ||
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.sub_category)
          }
          status={this.props.data && this.props.data.getArticle && this.props.data.getArticle.status}
          subject={this.props.data && this.props.data.getArticle && this.props.data.getArticle.title}
          metadata={this.props.data && this.props.data.getArticle && this.props.data.getArticle.attributes}
          isKauriTopicOwner={isKauriTopicOwner}
        />
        <SubmitArticleForm.Content
          {...this.props.form}
          category={
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.owner && this.props.data.getArticle.owner.id)
            // (this.props.data && this.props.data.getRequest && this.props.data.getRequest.category)
          }
          subCategory={
            (this.props.data && this.props.data.getRequest && this.props.data.getRequest.sub_category) ||
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.sub_category)
          }
          article_id={this.props.data && this.props.data.getArticle && this.props.data.getArticle.id}
          text={this.props.data && this.props.data.getArticle && this.props.data.getArticle.content}
          username={
            (this.props.data &&
              this.props.data.getArticle &&
              this.props.data.getArticle.author &&
              this.props.data.getArticle.author.name) ||
            this.props.username
          }
          userId={
            (this.props.data && this.props.data.getArticle && this.props.data.getArticle.authorId) || this.props.userId
          }
        />
      </Form>
    )
  }
}

const WrappedSubmitArticleForm = Form.create()(SubmitArticleForm)

export default WrappedSubmitArticleForm
