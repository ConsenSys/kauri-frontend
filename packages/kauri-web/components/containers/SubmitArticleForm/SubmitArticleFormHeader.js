// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Input } from 'antd'
import { ActionBadge } from '../../common/ActionBadge'
import theme from '../../../lib/theme-config'
import {
  CreateRequestLogo as SubmitArticleFormLogo,
  CreateRequestSecondaryHeader as SubmitArticleFormHeader,
  TopicActionsContainer as SubmitArticleFormSubjectContainer,
  ChooseTopicAndSubcategoryContainer as SubmitArticleFormTopicAndSubcategoryContainer,
  SelectSubCategory,
  ChooseTopic,
} from '../CreateRequestForm/CreateRequestHeader'

type Props = {
  getFieldValue: string => ?string,
  getFieldDecorator: (string, any) => any => any,
  getFieldError: string => ?Array<string>,
  category: ?string,
  subCategory: ?string,
  status?: string,
  subject?: ?string,
  isKauriTopicOwner: boolean,
  metadata?: ArticleMetadataDTO,
}

const errorBorderCss = css`
  border: 2px solid ${props => props.theme.errorRedColor};
`

const handleKeyPress = e => {
  if (e.key === 'Enter') e.preventDefault()
}

export const InputWrapper = styled.div`
  margin-left: 10px;
  position: relative;
  align-self: auto;
`

export const ArticleSubject = styled.input`
  display: inline-block;
  margin-left: 0px;
  background: none;
  background-color: transparent;
  border: none;
  color: white;
  height: 45px;
  font-size: 26px;
  font-weight: 500;
  padding: 0;
  padding-bottom: 2px;
  * {
    border: 1px solid #fff;
    font-size: 20px;
    font-weight: 500;
  }
  ::-webkit-input-placeholder {
    color: #fff;
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.primaryColor};
  }
  :focus::-webkit-input-placeholder {
    text-indent: -999px;
  }
  ::-moz-placeholder {
    color: #fff;
  }
  :focus::-moz-placeholder {
    text-indent: -999px;
  }
  ${({ hasErrors }) => hasErrors && errorBorderCss};
`

const articleUnderlineSpanCss = css`
  font-size: 26px !important;
`

export const UnderlineSpan = styled.span`
  user-select: none;
  border-top: 3px solid ${props => props.theme.primaryColor};
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 100%;
  height: 0;
  color: transparent;
  overflow: hidden;
  font-size: 12px;
  ${props => (props.type === 'article' || props.type === 'request') && articleUnderlineSpanCss};
`

export const ChosenCategory = styled.h4`
  margin-top: 5px;
  margin-left: 11px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`

export const ForVersion = ChosenCategory.extend`
  margin-top: 15px;
`

const ChosenSubcategory = ChosenCategory

const ForVersionInputContainer = styled.div`
  display: flex;
`

const ForVersionInputField = ArticleSubject.extend`
  height: 30px;
  font-size: 12px !important;
  margin-top: 10px;
`

const ForVersionInput = ({ getFieldDecorator, getFieldError, getFieldValue, forVersion }: *) => (
  <ForVersionInputContainer>
    <ForVersion>FOR VERSION</ForVersion>
    <InputWrapper>
      {getFieldDecorator('version', {
        rules: [
          {
            message: 'Please input the for version of the article!',
            whitespace: true,
          },
        ],
        initialValue: forVersion,
      })(
        <ForVersionInputField
          placeholder='E.G. 1.0.0'
          hasErrors={getFieldError('version') && getFieldError('version').length > 0}
          style={{
            width: 100,
            alignSelf: 'flex-start',
          }}
        />
      )}
      <UnderlineSpan>
        {typeof getFieldValue('version') === 'string' && getFieldValue('version').replace(/ /g, '\u00a0')}
      </UnderlineSpan>
    </InputWrapper>
  </ForVersionInputContainer>
)

const SubmitArticleFormSubject = ({
  getFieldDecorator,
  getFieldError,
  getFieldValue,
  chosenCategory,
  chosenSubcategory,
  subject,
  isKauriTopicOwner,
  metadata,
}: *) => (
  <SubmitArticleFormSubjectContainer>
    <SubmitArticleFormTopicAndSubcategoryContainer>
      {chosenCategory ? (
        <ChosenCategory>{chosenCategory}</ChosenCategory>
      ) : (
        <ChooseTopic
          getFieldError={getFieldError}
          isKauriTopicOwner={isKauriTopicOwner}
          getFieldDecorator={getFieldDecorator}
        />
      )}
      {chosenSubcategory ? (
        <ChosenSubcategory>{chosenSubcategory}</ChosenSubcategory>
      ) : (
        <SelectSubCategory getFieldError={getFieldError} getFieldDecorator={getFieldDecorator} />
      )}
    </SubmitArticleFormTopicAndSubcategoryContainer>
    <InputWrapper>
      {getFieldDecorator('subject', {
        rules: [
          {
            required: true,
            message: 'Please input the subject of the article!',
            whitespace: true,
            max: 55,
          },
        ],
        initialValue: subject,
      })(
        <ArticleSubject
          onKeyPress={handleKeyPress}
          placeholder='Add Article Title'
          maxlength={55}
          hasErrors={getFieldError('subject') && getFieldError('subject').length > 0}
          style={{
            width: 830,
            alignSelf: 'flex-start',
          }}
        />
      )}
      <UnderlineSpan type='article'>
        {typeof getFieldValue('subject') === 'string' && getFieldValue('subject').replace(/ /g, '\u00a0')}
      </UnderlineSpan>
    </InputWrapper>
    <ForVersionInput
      forVersion={metadata && metadata.FOR_VERSION}
      getFieldDecorator={getFieldDecorator}
      getFieldValue={getFieldValue}
      getFieldError={getFieldError}
    />
  </SubmitArticleFormSubjectContainer>
)

const SubmitArticleFormStatus = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 15px;
  align-items: center;
  > * {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #fff;
  }
  > :nth-child(2) {
    margin-left: 8px;
  }
  opacity: ${props => typeof props.status !== 'string' && 0.6};
`

export default ({
  category,
  subCategory,
  getFieldError,
  getFieldDecorator,
  status,
  subject,
  getFieldValue,
  isKauriTopicOwner,
  metadata,
}: Props) => (
  <SubmitArticleFormHeader type='article' theme={theme} chosenCategory={category || getFieldValue('category')}>
    <SubmitArticleFormLogo type='article' theme={theme} chosenCategory={category || getFieldValue('category')} />
    <SubmitArticleFormSubject
      getFieldError={getFieldError}
      getFieldValue={getFieldValue}
      subject={subject}
      theme={theme}
      chosenCategory={category}
      chosenSubcategory={subCategory}
      getFieldDecorator={getFieldDecorator}
      isKauriTopicOwner={isKauriTopicOwner}
      metadata={metadata}
    />
    <SubmitArticleFormStatus status={status}>
      <strong>STATUS</strong>
      <span>{(typeof status === 'string' && status.replace(/_/g, ' ')) || 'Not submitted'}</span>
    </SubmitArticleFormStatus>
  </SubmitArticleFormHeader>
)
