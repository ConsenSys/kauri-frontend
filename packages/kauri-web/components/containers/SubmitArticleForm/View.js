// @flow
import React from 'react'
import { Form } from 'antd'
import SubmitArticleFormActions from './SubmitArticleFormActions'
import SubmitArticleFormHeader from './SubmitArticleFormHeader'
import SubmitArticleFormContent from './SubmitArticleFormContent'
import type { AttributesPayload, ApproveArticlePayload } from './Module'
import ScrollToTopButton from '../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton'

import type { EditArticlePayload, SubmitArticlePayload, SubmitArticleVersionPayload } from './Module'
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
  owner: ?Owner,
}

type DraftArticlePayload = {
  id?: string,
  version?: number,
  subject: string,
  text: string,
  attributes?: AttributesPayload,
}

type Props = {
  draftArticleAction: DraftArticlePayload => void,
  submitArticleAction: SubmitArticlePayload => void,
  submitArticleVersionAction: SubmitArticleVersionPayload => void,
  editArticleAction: EditArticlePayload => void,
  publishArticleAction: PublishArticlePayload => void,
  approveArticleAction: ApproveArticlePayload => void,
  categories: Array<?string>,
  userId: string,
  article_id?: string,
  request_id: string,
  data?: ?{ getArticle?: ArticleDTO },
  article?: ArticleDTO,
  form: any,
  handleFormChange: ({ text: string }) => void,
  routeChangeAction: string => void,
  isKauriTopicOwner: boolean,
  showNotificationAction: ShowNotificationPayload => void,
  username?: ?string,
}

type SubmitArticleVariables = {
  subject: string,
  text: string,
  owner: ?Owner,
  version?: string,
  attributes?: AttributesPayload,
}

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

  checkNetwork = networkName => {
    if (networkName !== 'Rinkeby' && networkName !== 'Kauri Dev') {
      return this.props.showNotificationAction({
        notificationType: 'error',
        message: 'Network error!',
        description: 'Please switch to the correct Ethereum network!',
      })
    }
  }

  showFormError = formErr => {
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

  showGenericError = () => {
    return this.props.showNotificationAction({
      notificationType: 'error',
      message: 'Editor Error',
      description: 'Something went wrong with the article creation, please refresh the page and try again.',
    })
  }

  handleSubmit = (submissionType: string) => (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (formErr, { text, subject, attributes }: SubmitArticleVariables) => {
      const { networkName } = await this.getNetwork()
      await this.checkNetwork(networkName)
      const {
        submitArticleAction,
        submitArticleVersionAction,
        editArticleAction,
        draftArticleAction,
        approveArticleAction,
        article_id,
        userId,
      } = this.props

      if (formErr) return this.showFormError(formErr)

      const articleData: ArticleDTO = this.props.data && this.props.data.getArticle

      // NEW DRAFT
      if (!articleData && submissionType === 'draft') {
        return draftArticleAction({ text, subject, attributes: attributes || {} })
      }
      // NEW ARTICLE
      if (!articleData && submissionType === 'submit/update') {
        return submitArticleAction({ text, subject, attributes, selfPublish: true })
      }

      const { id, version, status, author, owner, dateCreated, contentHash, resourceIdentifier } = articleData

      switch (status) {
        case 'PUBLISHED':
          if (owner && userId === owner.id && submissionType === 'draft') {
            return submitArticleVersionAction({ id, text, subject, attributes: attributes || {} })
          } else if (owner && userId === owner.id && submissionType === 'submit/update') {
            return submitArticleVersionAction({
              id,
              text,
              subject,
              attributes,
              owner: resourceIdentifier,
              selfPublish: true,
            })
          } else if (owner && userId !== owner.id && submissionType === 'draft') {
            return submitArticleVersionAction({ id, text, subject, attributes })
          } else if (owner && userId !== owner.id && submissionType === 'submit/update') {
            return submitArticleVersionAction({
              id,
              text,
              subject,
              attributes,
              owner: resourceIdentifier,
              selfPublish: false,
            })
          } else {
            return this.showGenericError()
          }
        case 'DRAFT':
          if (author && userId === author.id && submissionType === 'draft') {
            return editArticleAction({ text, id, version, subject, attributes })
          } else if (author && userId === author.id && submissionType === 'submit/update') {
            return submitArticleVersionAction({
              id,
              text,
              subject,
              attributes,
              owner: resourceIdentifier,
              selfPublish: true,
            })
          } else {
            return this.showGenericError()
          }
        case 'PENDING':
        // pending articles should not be shown in the editor
        default:
          return this.showGenericError()
      }
    })
  }

  render () {
    const { routeChangeAction, isKauriTopicOwner, form } = this.props

    const articleData = this.props.data && this.props.data.getArticle

    return (
      <Form>
        <ScrollToTopButton />
        <SubmitArticleForm.Actions
          {...this.props.form}
          categories={this.props.categories}
          handleSubmit={this.handleSubmit}
          routeChangeAction={routeChangeAction}
          text={articleData && articleData.content}
          status={articleData && articleData.status}
          userId={this.props.userId}
          author={articleData && articleData.author && articleData.author.id}
          owner={articleData && articleData.owner && articleData.owner.id}
        />
        <SubmitArticleForm.Header
          {...this.props.form}
          status={articleData && articleData.status}
          subject={articleData && articleData.title}
          attributes={articleData && articleData.attributes}
          isKauriTopicOwner={isKauriTopicOwner}
        />
        <SubmitArticleForm.Content
          {...this.props.form}
          article_id={articleData && articleData.id}
          text={articleData && articleData.content}
          username={
            (this.props.data && articleData && articleData.owner && articleData.owner.username) || this.props.username
          }
          userId={(articleData && articleData.owner && articleData.owner.id) || this.props.userId}
        />
      </Form>
    )
  }
}

const WrappedSubmitArticleForm = Form.create()(SubmitArticleForm)

export default WrappedSubmitArticleForm
