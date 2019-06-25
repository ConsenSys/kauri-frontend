import React from "react";
import { EditorState, ContentState } from "draft-js";
import SharedEditor from "../../common/SharedEditor";
import styled from "styled-components";
import { CreateRequestContent as SubmitArticleFormContent } from "../../common/Legacy/CreateRequestContent";

import { CreateRequestContainer as SubmitArticleFormContainer } from "../../common/Legacy/CreateRequestContainer";

import { ISubmitArticlePayload } from "./Module";

interface IProps {
  submitArticleAction: (payload: ISubmitArticlePayload) => void;
  id?: string;
  data: any;
  article?: any;
  form: any;
  handleFormChange: ({ text }: { text: string }) => void;
  routeChangeAction: (route: string) => void;
  getFieldDecorator: (field: string, arg1: any) => any;
  getFieldsValue: () => any;
  setFieldsValue: ({ text }: { text: string }) => void;
  getFieldError: (err: string) => any;
  text?: string;
}

interface IState {
  editorState: any;
}

interface ISubmitArticleFormTextProps {
  getFieldError: any;
  text: any;
  setFieldsValue: any;
  getFieldsValue: any;
  getFieldDecorator: any;
}

class SubmitArticleFormText extends React.Component<
  ISubmitArticleFormTextProps,
  IState
> {
  constructor(props: ISubmitArticleFormTextProps) {
    super(props);
    if (props.text) {
      const rawData = ContentState.createFromText(
        JSON.parse(props.text).markdown
      );
      const newEditorState = EditorState.createWithContent(rawData);

      this.state = {
        editorState: { draftEditorState: newEditorState },
      };
    } else {
      const rawData = ContentState.createFromText("");
      const newEditorState = EditorState.createWithContent(rawData);

      this.state = {
        editorState: { draftEditorState: newEditorState },
      };
    }
  }

  componentDidMount() {
    if (this.props.text) {
      const rawData = ContentState.createFromText(
        JSON.parse(this.props.text).markdown
      );
      const newEditorState = EditorState.createWithContent(rawData);

      this.setState({
        editorState: { draftEditorState: newEditorState },
      });
    } else {
      const rawData = ContentState.createFromText("");
      const newEditorState = EditorState.createWithContent(rawData);

      this.setState({
        editorState: { draftEditorState: newEditorState },
      });
    }
  }

  handleChange = (editorState: any) => {
    this.setState(
      {
        editorState,
      },
      () =>
        this.props.setFieldsValue({
          text: editorState && editorState.markdown,
        })
    );
  };

  render() {
    return this.props.getFieldDecorator("text", {
      initialValue:
        typeof this.props.text === "string"
          ? JSON.stringify({ markdown: this.props.text })
          : null,
      rules: [
        {
          message:
            "Empty articles cannot be saved or published. Start writing!",
          required: true,
          whitespace: true,
        },
      ],
    })(
      <SharedEditor
        setFieldsValue={this.props.setFieldsValue}
        getFieldsValue={this.props.getFieldsValue}
        hasErrors={this.props.getFieldError("text")}
        editorState={this.state.editorState}
        handleChange={this.handleChange}
      />
    );
  }
}

export const RandomLineThatGoesAcrossTheContent = styled.div`
  width: 100%;
  height: 48px;
  left: 0;
  position: absolute;
  border-bottom: 1px solid #c8ccd0;
`;

export default (props: IProps) => {
  return (
    <SubmitArticleFormContent>
      <RandomLineThatGoesAcrossTheContent />
      <SubmitArticleFormContainer>
        <SubmitArticleFormText
          getFieldError={props.getFieldError}
          text={props.text}
          getFieldsValue={props.getFieldsValue}
          setFieldsValue={props.setFieldsValue}
          getFieldDecorator={props.getFieldDecorator}
        />
      </SubmitArticleFormContainer>
    </SubmitArticleFormContent>
  );
};
