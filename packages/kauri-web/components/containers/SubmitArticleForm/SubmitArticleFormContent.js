// @flow
import React, { Fragment } from 'react'
import { EditorState, ContentState } from 'draft-js'
import SharedEditor from '../../common/SharedEditor'
import styled from 'styled-components'
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
} from '../CreateRequestForm/CreateRequestContent'
import { contentStateFromHTML, getHTMLFromMarkdown } from '../../../lib/markdown-converter-helper'
import Outline from '../../../../kauri-components/components/Typography/Outline.bs'
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
    if (props.text) {
      const rawData = ContentState.createFromText(JSON.parse(props.text).markdown)
      const newEditorState = EditorState.createWithContent(rawData)

      this.state = {
        editorState: { draftEditorState: newEditorState },
      }
    } else {
      this.state = {
        editorState: { markdown: 'Write markdown content here!', text: 'Write markdown content here' },
      }
    }
  }

  componentDidMount () {
    if (this.props.text) {
      const rawData = ContentState.createFromText(JSON.parse(this.props.text).markdown)
      const newEditorState = EditorState.createWithContent(rawData)

      this.state = {
        editorState: { draftEditorState: newEditorState },
      }
    }
  }

  handleChange = editorState => {
    this.setState({
      editorState,
    })
    this.props.setFieldsValue({ text: JSON.stringify({ markdown: editorState && editorState.markdown }) })
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

export const SubmitArticleFormHeadings = ({ editorState }: *) => {
  // typeof editorState === 'object' && console.log(contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown)))

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

export const RandomLineThatGoesAcrossTheContent = styled.div`
  width: 100%;
  height: 48px;
  left: 0;
  position: absolute;
  border-bottom: 1px solid #c8ccd0;
`

export default class extends React.Component<
  {
    getFieldDecorator: (string, any) => any => any,
    setFieldsValue: ({ text: string }) => void,
    getFieldValue: string => any,
    getFieldError: string => any,
    text?: string,
    article_id?: string,
    username?: ?string,
    userId?: ?string,
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
      username,
      userId,
    } = this.props

    const editorState =
    getFieldValue('text') && typeof getFieldValue('text') === 'string' && JSON.parse(getFieldValue('text'))

    const outlineHeadings =
    typeof editorState === 'object' &&
    (editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type.includes('header'))
        .map(header => header.text)
      : editorState.blocks &&
      editorState.blocks.filter(block => block.type.includes('header')).map(header => header.text))

    return (
      <SubmitArticleFormContent>
        <RandomLineThatGoesAcrossTheContent />
        <SubmitArticleFormContainer onClick={() => this.setState({ focused: true })}>
          <SubmitArticleFormText
            getFieldError={getFieldError}
            text={text}
            setFieldsValue={setFieldsValue}
            getFieldDecorator={getFieldDecorator}
          />
        </SubmitArticleFormContainer>
        <SubmitArticleFormDetails isSubmitting type='outline'>
          <Outline pageType='SubmittingArticle' headings={outlineHeadings || []} username={username || userId} />
        </SubmitArticleFormDetails>
      </SubmitArticleFormContent>
    )
  }
}
