import React from 'react'
import styled, { css } from 'styled-components'
import { Select, Input } from 'antd'
import theme, { categories } from '../../../lib/theme-config'
import { ActionBadge, Badge } from '../../common/ActionBadge'
import { PositiveRequestActionBadge } from '../../common/ActionButton'
import GreenArrow from '../../common/GreenArrow'
import { ChosenCategory, InputWrapper, UnderlineSpan } from '../SubmitArticleForm/SubmitArticleFormHeader'

const config = require('../../../config')
const Option = Select.Option

const CreateRequestActions = styled.div`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.primaryTextColor};
  padding: 36px ${props => props.theme.padding};
`

const PullRight = styled.div`
  margin-left: auto;
  display: flex;
  align-self: center;
`
const CreateRequestHeader = styled.section``

const articleHeaderCss = css`
  height: 196px;
`

export const CreateRequestSecondaryHeader = styled.div`
  display: flex;
  height: 163px;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  background-color: ${props =>
    props.chosenCategory
      ? theme[props.chosenCategory] && theme[props.chosenCategory].primaryColor
      : props.theme.primaryTextColor};
  ${props => props.type === 'article' && articleHeaderCss};
`

const Logo = styled.img`
  max-height: ${props => props.avatarHeight || '37.71'}px;
  max-width: 55px;
`

export const errorBorderCss = css`
  border: 2px solid ${props => props.theme.errorRedColor};
`

const articleMaskCss = css`
  height: 96px;
  width: 96px;
`

export const Mask = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: ${props => props.height || '76'}px;
  width: ${props => props.width || '76'}px;
  border-radius: 4px;
  background-color: #ffffff;
  ${props => props.type === 'article' && articleMaskCss};
  border: 1px solid
    ${props =>
    props.chosenCategory
      ? props.theme[props.chosenCategory] && props.theme[props.chosenCategory].primaryColor
      : props.theme.primaryColor};
`

export const CreateRequestLogo = ({ chosenCategory, height, width, avatarWidth, avatarHeight, type }) => (
  <Mask chosenCategory={chosenCategory} height={height} width={width} type={type}>
    {chosenCategory ? (
      <Logo
        avatarHeight={type === 'article' ? 46 : avatarHeight}
        avatarWidth={type === 'article' ? 46 : avatarWidth}
        src={`/static/images/${chosenCategory}/avatar.png`}
      />
    ) : (
      <Logo
        avatarHeight={type === 'article' ? 46 : avatarHeight}
        avatarWidth={type === 'article' ? 46 : avatarWidth}
        src={`/static/images/help-logo.svg`}
      />
    )}
  </Mask>
)

export const TopicActionsContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  margin-top: 3px;
  margin-left: 12px;
  > :nth-child(2) {
    align-self: center;
  }
  width: ${props => props.type === 'createRequest' && '95%'};
  width: ${props => props.type === 'in review article' && '100%'};
`

const handleKeyPress = e => {
  if (e.key === 'Enter') e.preventDefault()
}

const ChooseTopicSelect = styled(Select)`
  background-color: transparent;
  .ant-select,
  .ant-select-selection,
  .ant-select-selection--single {
    background-color: transparent;
  }
  .ant-select-selection__placeholder,
  .ant-select-search__field__placeholder,
  span,
  *,
  > * {
    border: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
  }
  ${props => props.hasErrors && errorBorderCss};
`

const renderCategoryOptions = type => {
  const categoryOptions = categories
  if (type !== 'request' && !categoryOptions.find(category => category === 'personal')) {
    categoryOptions.unshift('personal')
  }
  return categoryOptions.map(
    category =>
      category === 'personal' ? (
        <Option key={category} value={null}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Option>
      ) : (
        <Option key={category} value={category.toLowerCase()}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Option>
      )
  )
}

export const ChooseTopic = ({ getFieldDecorator, getFieldError, chosenCategory, isKauriTopicOwner, type }) =>
  getFieldDecorator('category', {
    rules: [
      {
        whitespace: true,
      },
    ],
    defaultValue: chosenCategory && chosenCategory.toLowerCase(),
    initialValue: chosenCategory && chosenCategory.toLowerCase(),
  })(
    chosenCategory ? (
      <ChosenCategory>{chosenCategory}</ChosenCategory>
    ) : (
      <ChooseTopicSelect
        hasErrors={getFieldError('category')}
        style={{ width: 126 }}
        showSearch
        placeholder={'Choose Topic'}
      >
        {renderCategoryOptions(type)}
      </ChooseTopicSelect>
    )
  )

const ChosenSubCategory = ChosenCategory
const ChooseSubCategorySelect = ChooseTopicSelect

export const SelectSubCategory = ({ getFieldDecorator, getFieldError, chosenSubCategory }) =>
  getFieldDecorator('sub_category', {
    rules: [
      {
        required: true,
        message: 'Please input the category of the request!',
        whitespace: true,
      },
    ],
    defaultValue: chosenSubCategory && chosenSubCategory.toLowerCase(),
    initialValue: chosenSubCategory && chosenSubCategory.toLowerCase(),
  })(
    chosenSubCategory ? (
      <ChosenSubCategory>{chosenSubCategory}</ChosenSubCategory>
    ) : (
      <ChooseSubCategorySelect
        hasErrors={getFieldError('sub_category')}
        style={{ width: 150 }}
        showSearch
        placeholder='SELECT CATEGORY'
      >
        {config.default.subCategories.map(subCategory => (
          <Option key={subCategory} value={subCategory.toLowerCase()}>
            {subCategory}
          </Option>
        ))}
      </ChooseSubCategorySelect>
    )
  )

export const RequestSubject = styled(Input)`
  display: inline-block;
  background: none;
  background-color: transparent;
  border: none;
  color: white;
  height: 45px;
  font-size: 26px !important;
  font-weight: 500;
  padding: 0;
  padding-bottom: 2px;
  * {
    border: 1px solid #fff;
    font-size: 20px !important;
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

export const ChooseTopicAndSubcategoryContainer = styled.div`
  display: flex;
  > :last-child {
    margin-left: 30px;
  }
`

const CreateRequestDetails = styled.div`
  display: flex;
  align-self: auto !important;
  justify-content: space-between;
  > :last-child {
    > * {
      color: #fff;
    }
  }
`

const Badges = styled.div`
  display: flex;
  > div {
    margin-left: 15px;
  }
`

const CreateRequestTopicActions = ({
  getFieldDecorator,
  getFieldError,
  getFieldValue,
  subject,
  chosenCategory,
  chosenSubCategory,
}) => (
  <TopicActionsContainer type='createRequest'>
    <ChooseTopicAndSubcategoryContainer>
      <ChooseTopic
        type='request'
        getFieldError={getFieldError}
        chosenCategory={chosenCategory}
        getFieldDecorator={getFieldDecorator}
      />
      <SelectSubCategory
        getFieldError={getFieldError}
        chosenSubCategory={chosenSubCategory}
        getFieldDecorator={getFieldDecorator}
      />
    </ChooseTopicAndSubcategoryContainer>
    <CreateRequestDetails>
      <InputWrapper>
        {getFieldDecorator('subject', {
          rules: [
            {
              required: true,
              message: 'Please input the subject of the request!',
              whitespace: true,
              max: 60,
            },
          ],
          initialValue: subject,
          defaultValue: subject,
        })(
          <RequestSubject
            onKeyPress={handleKeyPress}
            maxlength={60}
            placeholder='Add Request Title'
            hasErrors={getFieldError('subject') && getFieldError('subject').length > 0}
            style={{
              width: 850,
            }}
          />
        )}
        <UnderlineSpan type='request'>
          {typeof getFieldValue('subject') === 'string' && getFieldValue('subject').replace(/ /g, '\u00a0')}
        </UnderlineSpan>
      </InputWrapper>
      {!subject && (
        <Badges>
          <Badge>
            <strong>0</strong>
            <strong>IN PROGRESS</strong>
          </Badge>
          <Badge>
            <strong>0</strong>
            <strong>SUBMISSIONS</strong>
          </Badge>
          <Badge>
            <strong>0</strong>
            <strong>COMMENTS</strong>
          </Badge>
        </Badges>
      )}
    </CreateRequestDetails>
  </TopicActionsContainer>
)

export default ({ getFieldDecorator, getFieldError, getFieldValue, routeChangeAction, handleSubmit, data }) => (
  <CreateRequestHeader>
    <CreateRequestActions>
      <ActionBadge onClick={() => routeChangeAction('back')}>
        <GreenArrow direction={'left'} />
        <span>Cancel Request</span>
      </ActionBadge>
      <PullRight>
        <PositiveRequestActionBadge type='primary' action={handleSubmit}>
          <span>{data && data.getRequest && data.getRequest.text ? 'Update Request' : 'Submit Request'}</span>
        </PositiveRequestActionBadge>
      </PullRight>
    </CreateRequestActions>
    <CreateRequestSecondaryHeader
      chosenCategory={
        (getFieldValue && getFieldValue('category')) || (data && data.getRequest && data.getRequest.category)
      }
    >
      <CreateRequestLogo
        chosenCategory={
          (getFieldValue && getFieldValue('category')) || (data && data.getRequest && data.getRequest.category)
        }
      />
      <CreateRequestTopicActions
        subject={data && data.getRequest && data.getRequest.subject}
        chosenCategory={data && data.getRequest && data.getRequest.category}
        chosenSubCategory={data && data.getRequest && data.getRequest.sub_category}
        getFieldDecorator={getFieldDecorator}
        getFieldValue={getFieldValue}
        getFieldError={getFieldError}
      />
    </CreateRequestSecondaryHeader>
  </CreateRequestHeader>
)
