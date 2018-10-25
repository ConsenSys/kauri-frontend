// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 4,
      offset: 18,
    },
  },
}

const disabledButtonCss = css`
  background-color: ${props => props.theme.disabledBackgroundColor} !important;
  > span {
    color: ${props => props.theme.disabledTextColor} !important;
  }
`

const AddCommentButton = styled(Button)`
  background: ${props => props.theme.primaryColor};
  transition: none !important;
  border: 1px solid ${props => props.theme.primaryColor};
  :hover {
    border: 1px solid ${props => props.theme.hoverTextColor} !important;
    background: ${props => props.theme.hoverTextColor};
  }
  ${props => props.disabled && disabledButtonCss};
`

type Props = any;

class AddCommentForm extends React.Component<Props> {
  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((formErr: any, values: { comment: string }) => {
      if (!formErr) {
        const { highlight_from, highlight_to, anchor_key, focus_key, article_id } = this.props
        return this.props.addCommentAction(
          { ...values, article_id, highlight_from, highlight_to, anchor_key, focus_key },
          () => {
            this.props.form.resetFields()
            console.log(highlight_from)
          }
        )
      }
      return console.error(formErr)
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} hasFeedback>
          {getFieldDecorator('comment', {
            rules: [
              {
                required: true,
                message: 'Please input your comment for the article!',
                whitespace: true,
              },
            ],
          })(<Input.TextArea rows={5} data-test-id='comment' />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <AddCommentButton
            data-test-id='submit'
            type='primary'
            htmlType='submit'
            disabled={this.hasErrors(getFieldsError())}
          >
            Submit
          </AddCommentButton>
        </FormItem>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create()(AddCommentForm)

export default WrappedRegistrationForm
