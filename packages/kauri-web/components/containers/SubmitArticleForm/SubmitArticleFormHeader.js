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

export const ArticleSubject = styled(Input)`
  background: none;
  background-color: transparent;
  color: white;
  height: 45px;
  font-size: 26px !important;
  font-weight: 500;
  border: 1px solid #fff;
  margin-left: 20px;
  :hover {
    border: 1px solid #fff;
  }
  * {
    border: 1px solid #fff;
    font-size: 20px !important;
    font-weight: 500;
    :hover {
      background-color: ${props => props.theme.hoverTextColor} !important;
    }
  }
  ::-webkit-input-placeholder {
    color: #fff;
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

export const ChosenCategory = styled.h4`
  margin-top: 10px;
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

const ForVersionInput = ({ getFieldDecorator, getFieldError, forVersion }: *) => (
  <ForVersionInputContainer>
    <ForVersion>FOR VERSION</ForVersion>
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
          marginLeft: 10,
          alignSelf: 'flex-start',
        }}
      />
    )}
  </ForVersionInputContainer>
)

const SubmitArticleFormSubject = ({
  getFieldDecorator,
  getFieldError,
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
        placeholder='Article Title'
        maxlength={55}
        hasErrors={getFieldError('subject') && getFieldError('subject').length > 0}
        style={{
          width: 830,
          marginLeft: 10,
          alignSelf: 'flex-start',
        }}
      />
    )}
    <ForVersionInput
      forVersion={metadata && metadata.FOR_VERSION}
      getFieldDecorator={getFieldDecorator}
      getFieldError={getFieldError}
    />
  </SubmitArticleFormSubjectContainer>
)

const SubmitArticleFormStatus = ActionBadge

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
      subject={subject}
      theme={theme}
      chosenCategory={category}
      chosenSubcategory={subCategory}
      getFieldDecorator={getFieldDecorator}
      isKauriTopicOwner={isKauriTopicOwner}
      metadata={metadata}
    />
    {Boolean(status) && (
      <SubmitArticleFormStatus>
        <strong>STATUS</strong>
        <span>{status}</span>
      </SubmitArticleFormStatus>
    )}
  </SubmitArticleFormHeader>
)
