// @flow
import React from 'react'
import { Form } from 'antd'
import { ContentState, EditorState } from 'draft-js'
import CreateRequestHeader from './CreateRequestHeader'
import CreateRequestContent from './CreateRequestContent'

import type { CreateRequestPayload } from './Module'

type Props = any

class CreateRequestForm extends React.Component<Props, { editorState: any }> {
  constructor (props: Props) {
    super(props)
    if (props.data && props.data.getRequest && props.data.getRequest.text) {
      const rawData = ContentState.createFromText(JSON.parse(props.data.getRequest.text).markdown)
      const newEditorState = EditorState.createWithContent(rawData)
      this.state = {
        editorState: { draftEditorState: newEditorState },
      }
    } else {
      this.state = { editorState: { markdown: 'Write markdown content here!', text: 'Write markdown content here!' } }
    }
  }

  handleChange = editorState => {
    this.setState({ editorState })
    this.props.form.setFieldsValue({
      text: JSON.stringify(editorState),
    })
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

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

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (formErr, values: CreateRequestPayload) => {
      const { networkName } = await this.getNetwork()
      if (networkName !== 'Rinkeby' && networkName !== 'Kauri Dev') {
        return this.props.showNotificationAction({
          notificationType: 'error',
          message: 'Network error!',
          description: 'Please switch to the correct Ethereum network!',
        })
      }
      if (!formErr) {
        console.log(values)
        if (this.props.request_id) {
          return this.props.updateRequestAction({ ...values, request_id: this.props.request_id })
        } else {
          return this.props.createRequestAction(values, this.props.form.resetFields)
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
    })
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <CreateRequestHeader
          {...this.props}
          {...this.props.form}
          routeChangeAction={this.props.routeChangeAction}
          handleSubmit={this.handleSubmit}
        />
        <CreateRequestContent
          {...this.props}
          {...this.props.form}
          ethUsdPrice={this.props.ethUsdPrice}
          editorState={this.state.editorState}
          handleChange={this.handleChange}
        />
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create()(CreateRequestForm)

export default WrappedRegistrationForm
