import React from "react";
import styled, { css } from "styled-components";
import theme from "../../../lib/theme-config";
import type { AttributesPayload } from "./Module";
import {
  CreateRequestSecondaryHeader as SubmitArticleFormHeader,
  TopicActionsContainer as SubmitArticleFormSubjectContainer,
} from "../CreateRequestForm/CreateRequestHeader";
import TagSelector from "../../common/TagSelector";

type Props = {
  getFieldValue: string => ?string,
  getFieldDecorator: (string, any) => any => any,
  getFieldError: string => ?Array<string>,
  status?: string,
  subject?: ?string,
  isKauriTopicOwner: boolean,
  attributes?: AttributesPayload,
};

const errorBorderCss = css`
  border: 2px solid ${props => props.theme.errorRedColor};
`;

const handleKeyPress = e => {
  if (e.key === "Enter") e.preventDefault();
};

export const InputWrapper = styled.div`
  margin-left: 10px;
  position: relative;
  align-self: auto;
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme && props.theme.colors.bgPrimary};
  opacity: 0.8;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

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
`;

const articleUnderlineSpanCss = css`
  font-size: 26px !important;
`;
export const UnderlineSpan = styled.span`
  user-select: none;
  border-top: 3px solid ${props => props.theme.primaryColor};
  left: 0;
  bottom: 0;
  max-width: 100%;
  height: 0;
  color: transparent;
  overflow: hidden;
  font-size: 12px;
  ${props =>
    (props.type === "article" || props.type === "request") &&
    articleUnderlineSpanCss};
`;

const SubmitArticleFormSubject = ({
  getFieldDecorator,
  getFieldError,
  getFieldValue,
  setFieldsValue,
  subject,
  tags,
  isKauriTopicOwner,
  attributes,
  form,
}: *) => (
  <SubmitArticleFormSubjectContainer>
    <InputWrapper maxlength={150}>
      {getFieldDecorator("subject", {
        rules: [
          {
            required: true,
            message: "Please input the subject of the article!",
            whitespace: true,
            max: 150,
          },
        ],
        initialValue: subject,
      })(
        <ArticleSubject
          onKeyPress={handleKeyPress}
          placeholder="Add Article Title"
          maxLength={100}
          hasErrors={
            getFieldError("subject") && getFieldError("subject").length > 0
          }
          style={{
            width: "100%",
            alignSelf: "flex-start",
          }}
        />
      )}
      <UnderlineSpan type="article">
        {typeof getFieldValue("subject") === "string" &&
          getFieldValue("subject").replace(/ /g, "\u00a0")}
      </UnderlineSpan>
      <TagSelector
        tags={tags}
        setFieldsValue={setFieldsValue}
        getFieldDecorator={getFieldDecorator}
      />
    </InputWrapper>
  </SubmitArticleFormSubjectContainer>
);

const getBG = (getFieldValue, attributes) => {
  const formValue = getFieldValue("attributes");
  if (formValue && typeof formValue.background === "string") {
    return `background-image: url(${
      formValue.background
    }); background-size: cover; background-position: center center;`;
  }
  if (attributes && attributes.background) {
    return `background-image: url(${
      attributes.background
    }); background-size: cover; background-position: center center;`;
  }
  return "background: #1E2428;";
};

export default ({
  getFieldError,
  getFieldDecorator,
  status,
  subject,
  tags,
  getFieldValue,
  setFieldsValue,
  isKauriTopicOwner,
  attributes,
}: Props) => (
  <SubmitArticleFormHeader
    bg={getBG(getFieldValue, attributes)}
    type="article"
    theme={theme}
  >
    <Overlay />
    <SubmitArticleFormSubject
      getFieldError={getFieldError}
      getFieldValue={getFieldValue}
      subject={subject}
      tags={tags}
      theme={theme}
      getFieldDecorator={getFieldDecorator}
      setFieldsValue={setFieldsValue}
      isKauriTopicOwner={isKauriTopicOwner}
      attributes={attributes}
    />
  </SubmitArticleFormHeader>
);
