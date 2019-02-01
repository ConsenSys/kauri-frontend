// @flow
import React from "react";
import { EditorState, ContentState } from "draft-js";
import SharedEditor from "../../common/SharedEditor";
import styled from "styled-components";
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
} from "../CreateRequestForm/CreateRequestContent";
import type { EditArticlePayload, SubmitArticlePayload } from "./Module";

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
    };

type State = {
  editorState: any,
};

class SubmitArticleFormText extends React.Component<Props, State> {
  constructor(props) {
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

      this.state = {
        editorState: { draftEditorState: newEditorState },
      };
    }
  }

  handleChange = editorState => {
    this.setState(
      {
        editorState,
      },
      () =>
        this.props.setFieldsValue({ text: editorState && editorState.markdown })
    );
  };

  render() {
    return this.props.getFieldDecorator("text", {
      rules: [
        {
          required: true,
          message:
            "Empty articles cannot be saved or published. Start writing 😘",
          whitespace: true,
        },
      ],
      initialValue:
        typeof this.props.text === "string"
          ? JSON.stringify({ markdown: this.props.text })
          : null,
    })(
      <SharedEditor
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

export default class extends React.Component<
  {
    getFieldDecorator: (string, any) => any => any,
    setFieldsValue: ({ text: string }) => void,
    getFieldValue: string => any,
    getFieldError: string => any,
    text?: string,
    article_id?: string,
    ownerId: ?string,
    username?: ?string,
    userId: string,
    userAvatar: ?string,
    isUpdating: boolean,
  },
  { focused: boolean }
> {
  state = {
    focused: false,
  };

  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldError,
      text,
    } = this.props;

    return (
      <SubmitArticleFormContent>
        <RandomLineThatGoesAcrossTheContent />
        <SubmitArticleFormContainer
          onClick={() => this.setState({ focused: true })}
        >
          <SubmitArticleFormText
            getFieldError={getFieldError}
            text={text}
            setFieldsValue={setFieldsValue}
            getFieldDecorator={getFieldDecorator}
          />
        </SubmitArticleFormContainer>
      </SubmitArticleFormContent>
    );
  }
}
