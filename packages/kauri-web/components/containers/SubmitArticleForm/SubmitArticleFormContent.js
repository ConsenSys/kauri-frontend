// @flow
import React, { Fragment } from 'react'
import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import SharedEditor from '../../common/SharedEditor'
import styled from 'styled-components'
import { Divider } from 'antd'
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
} from '../CreateRequestForm/CreateRequestContent'
import { contentStateFromHTML, getHTMLFromMarkdown } from '../../../lib/markdown-converter-helper'
import { ApprovedArticleDetails as SubmitArticleFormDetails } from '../Article/ApprovedArticle/ApprovedArticleContent'

import type { EditArticlePayload, SubmitArticlePayload } from './Module'

type Props =
  | any
  | {
      submitArticleAction: SubmitArticlePayload => void,
      editArticleAction: EditArticlePayload => void,
      article_id?: string,
      request_id: string,
      data: any,
      article?: any,
      form: any,
      handleFormChange: ({ text: string }) => void,
      routeChangeAction: string => void,
      getFieldDecorator: (string, any) => any => any,
      setFieldsValue: ({ text: string }) => void,
      getFieldError: string => any,
      text?: string,
    }

type State = {
  editorState: any,
}

class SubmitArticleFormText extends React.Component<Props, State> {
  constructor (props) {
    super(props)
    if (typeof props.text === 'string') {
      const rawData = ContentState.createFromText(JSON.parse(props.text).markdown)
      const newEditorState = EditorState.createWithContent(rawData)

      this.state = {
        editorState: { draftEditorState: newEditorState },
      }
    } else {
      this.state = {
        editorState: null,
      }
    }
  }

  handleChange = editorState => {
    this.setState({
      editorState,
    })
    this.props.setFieldsValue({ text: JSON.stringify(editorState) })
  }

  render () {
    return this.props.getFieldDecorator('text', {
      rules: [
        {
          required: true,
          message: 'Please input the description of the request!',
          whitespace: true,
        },
      ],
      initialValue: this.props.text,
    })(
      <SharedEditor
        hasErrors={this.props.getFieldError('text')}
        editorState={this.state.editorState}
        handleChange={this.handleChange}
      />
    )
  }
}

const OutlineHeader = styled.h5`
  margin-bottom: 20px;
  color: ${props => props.theme.primaryColor};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
  :hover {
    color: ${props => props.theme.secondaryTextColor};
  }
`

export const SubmitArticleFormHeadings = ({ editorState }) => {
  // typeof editorState === 'object' && console.log(contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown)))
  const outlineHeadings =
    typeof editorState === 'object' &&
    (editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
          .getBlocksAsArray()
          .map(block => block.toJS())
          .filter(block => block.type.includes('header'))
      : editorState.blocks && editorState.blocks.filter(block => block.type.includes('header')))

  return (
    <div>
      {/* {console.log(contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown)))} */}
      {outlineHeadings &&
        outlineHeadings.map((header, i) => (
          <OutlineHeader
            onClick={() => {
              const outlineHeaderHash = header.text
                .replace(/ /g, '')
                .replace(/\W|_/g, '')
                .toLowerCase()
              const headerDOMNode = document.getElementById(outlineHeaderHash)
              if (headerDOMNode) {
                headerDOMNode.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' })
                setTimeout(() => (window.location.hash = outlineHeaderHash), 700)
              }
            }}
            key={i}
          >
            {header.text}
          </OutlineHeader>
        ))}
    </div>
  )
}

export const OutlineLabel = styled.h3`
  margin-bottom: 0px;
  align-self: flex-start;
  font-weight: 200;
  font-family: 'Roboto-Light', 'Roboto Light', 'Roboto';
  font-style: normal;
  font-size: 20px;
  color: ${props => props.theme.secondaryColor};
  line-height: 24px;
`

export default class extends React.Component<
  {
    getFieldDecorator: (string, any) => any => any,
    setFieldsValue: ({ text: string }) => void,
    getFieldValue: string => any,
    getFieldError: string => any,
    text?: string,
    article_id?: string,
  },
  { focused: boolean }
> {
  state = {
    focused: false,
  }

  render () {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      getFieldError,
      text,
      article_id,
      category,
      subCategory,
    } = this.props
    return (
      <SubmitArticleFormContent>
        <SubmitArticleFormContainer onClick={() => this.setState({ focused: true })}>
          <SubmitArticleFormText
            getFieldError={getFieldError}
            text={text}
            setFieldsValue={setFieldsValue}
            getFieldDecorator={getFieldDecorator}
          />
        </SubmitArticleFormContainer>
        <SubmitArticleFormDetails type='outline'>
          <OutlineLabel>Outline</OutlineLabel>
          <Divider style={{ margin: '20px 0' }} />
          <SubmitArticleFormHeadings
            editorState={
              getFieldValue('text') && typeof getFieldValue('text') === 'string' && JSON.parse(getFieldValue('text'))
            }
          />
        </SubmitArticleFormDetails>
      </SubmitArticleFormContent>
    )
  }
}
