import React from 'react'
import styled, { css } from 'styled-components'
import { EditorState, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js'
import { createTypeStrategy } from 'megadraft'
import SharedEditor from '../../common/SharedEditor'
import { Button, Form } from 'antd'

const FormItem = Form.Item

export const LinkDecorator = ({ entityKey, children, contentState }) => {
  const { url } = contentState.getEntity(entityKey).getData()
  return (
    <a className='editor__link' href={url} title={url}>
      {children}
    </a>
  )
}

const disabledButtonCss = css`
  background-color: ${props => props.theme.disabledBackgroundColor} !important;
  > span {
    color: ${props => props.theme.disabledTextColor} !important;
  }
`

const SubmitCommentButton = styled(Button)`
  height: 40px;
  width: 183px;
  color: #fff;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColor};
  border: 1px solid ${props => props.theme.primaryColor} !important;
  > span {
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
  :hover {
    background: ${props => props.theme.hoverTextColor} !important;
    border: 2px solid ${props => props.theme.hoverTextColor} !important;
  }
  ${props => props.disabled && disabledButtonCss};
`

const CancelCommentButton = styled(Button)`
  height: 40px;
  width: 183px;
  background: transparent !important;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.primaryColor} !important;
  > span {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }
  :hover {
    background: transparent !important;
    box-shadow: 0 0 0 2px ${props => props.theme.primaryColor} !important;
  }
`

const QuestionEditor = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  padding: 10px 0px;
  .react-mde-tabbed-layout .mde-tabs .mde-tab-activated {
    border-bottom: 1px solid #c8ccd0;
  }
  .react-mde-tabbed-layout .mde-tabs .mde-tab:hover {
    border-bottom: 1px solid #c8ccd0;
  }
`

const FormButtons = styled.div`
  display: flex;
  width: 100%;
  > :first-child {
    margin-right: 20px;
  }
`

class SubmitQuestion extends React.Component {
  state = {
    editorState: null,
  }

  handleChange = editorState => {
    this.setState({ editorState })
    this.props.form.setFieldsValue({
      comment: JSON.stringify(editorState),
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (formErr, { comment }) => {
      if (!formErr) {
        const plainTextComment = this.state.editorState.draftEditorState.getCurrentContent().getPlainText()
        if (!plainTextComment) {
          return this.props.form.setFields({
            comment: {
              errors: [new Error('Please enter a non-empty comment!')],
            },
          })
        }
        if (this.props.type === 'in review article') {
          const result = this.props.addCommentAction(
            {
              article_id: this.props.article_id,
              article_version: this.props.article_version,
              comment,
            },
            () => this.props.cancelAskingQuestion()
          )
          return result
        }
        const result = this.props.addRequestCommentAction(
          {
            comment,
            request_id: this.props.request_id,
          },
          () => this.props.cancelAskingQuestion()
        )
        return result
      }
      return console.error(formErr)
    })
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  render () {
    const { getFieldDecorator, getFieldsError } = this.props.form
    return (
      <QuestionEditor>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 22, offset: 1 },
            }}
          >
            {getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                  message: 'Please input the question for the request!',
                  whitespace: true,
                },
              ],
            })(
              <SharedEditor
                requestCommentEditor
                editorKey='foobaz'
                editorState={this.state.editorState}
                handleChange={this.handleChange}
              />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 22, offset: 1 },
            }}
          >
            <FormButtons>
              <SubmitCommentButton
                data-test-id='submit'
                type='primary'
                htmlType='submit'
                disabled={this.hasErrors(getFieldsError())}
              >
                SUBMIT COMMENT
              </SubmitCommentButton>
              <CancelCommentButton data-test-id='cancel' htmlType='button' onClick={this.props.cancelAskingQuestion}>
                CANCEL
              </CancelCommentButton>
            </FormButtons>
          </FormItem>
        </Form>
      </QuestionEditor>
    )
  }
}

const WrappedSubmitQuestionForm = Form.create()(SubmitQuestion)
export default WrappedSubmitQuestionForm
