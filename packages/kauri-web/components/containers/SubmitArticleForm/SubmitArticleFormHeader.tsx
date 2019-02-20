import React from "react";
import styled, { css } from "styled-components";
import theme from "../../../lib/theme-config";
import { IAttributesPayload } from "./Module";
import { CreateRequestSecondaryHeader as SubmitArticleFormHeader } from "../../common/Legacy/CreateRequestSecondaryHeader";
import { TopicActionsContainer as SubmitArticleFormSubjectContainer } from "../../common/Legacy/TopicActionsContainer";
import TagSelector from "../../common/TagSelector";

interface IProps {
  getFieldValue: (field: string) => any;
  getFieldDecorator: (arg0: string, arg1: any) => any;
  getFieldError: (err: string) => string[];
  setFieldsValue: (err: string) => string[];
  status?: string;
  subject?: string;
  attributes?: IAttributesPayload;
  tags: string[];
}

const errorBorderCss = css`
  border: 2px solid ${props => props.theme.errorRedColor};
`;

const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
};

export const InputWrapper = styled<{ maxlength: number }, "div">("div")`
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

export const ArticleSubject = styled<{ hasErrors: boolean }, "input">("input")`
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
export const UnderlineSpan = styled<{ type: string }, "span">("span")`
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
}: IProps) => (
  <SubmitArticleFormSubjectContainer>
    <InputWrapper maxlength={150}>
      {getFieldDecorator("subject", {
        initialValue: subject,
        rules: [
          {
            max: 150,
            message: "Please input the subject of the article!",
            required: true,
            whitespace: true,
          },
        ],
      })(
        <ArticleSubject
          onKeyPress={handleKeyPress}
          placeholder="Add Article Title"
          maxLength={100}
          hasErrors={
            getFieldError("subject") && getFieldError("subject").length > 0
          }
          style={{
            alignSelf: "flex-start",
            width: "100%",
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

const getBG = (
  getFieldValue: (field: string) => any,
  attributes?: IAttributesPayload
) => {
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
  subject,
  tags,
  getFieldValue,
  setFieldsValue,
  attributes,
}: IProps) => (
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
      getFieldDecorator={getFieldDecorator}
      setFieldsValue={setFieldsValue}
      attributes={attributes}
    />
  </SubmitArticleFormHeader>
);
