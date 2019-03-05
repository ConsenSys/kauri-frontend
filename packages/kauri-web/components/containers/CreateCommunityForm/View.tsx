import * as React from "react";
import styled from "../../../lib/styled-components";
import Actions from "./CreateCommunityFormActions";
import Header from "./CreateCommunityFormHeader";
import Content from "./CreateCommunityFormContent";
import setImageUploader from "../../common/ImageUploader";
import { routeChangeAction } from "../../../lib/Module";
import { createCommunityAction } from "./Module";
import { InjectedFormikProps } from "formik";
import Helmet from "react-helmet";
import { IFormValues } from "./index";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export interface IProps {
  routeChangeAction: typeof routeChangeAction;
  createCommunityAction: typeof createCommunityAction;
}

const handleBackgroundSetFormField = (setFieldValue: any) => () =>
  setImageUploader((payload: any) => {
    setFieldValue("attributes.background", payload.background.background);
  }, "background");

const handleAvatarSetFormField = (setFieldValue: any) => () =>
  setImageUploader((payload: any) => {
    setFieldValue("avatar", payload.avatar.background);
  }, "avatar");

const Component: React.SFC<
  InjectedFormikProps<IProps, IFormValues>
> = props => (
  <FormContainer onSubmit={props.handleSubmit}>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://transloadit.edgly.net/releases/uppy/v0.24.3/dist/uppy.min.css"
      />
    </Helmet>

    <Actions
      goBack={() => props.routeChangeAction(`back`)}
      setupImageUploader={handleBackgroundSetFormField(props.setFieldValue)}
    />

    <Header
      avatar={props.values.avatar}
      background={props.values.attributes && props.values.attributes.background}
      uploadLogo={handleAvatarSetFormField(props.setFieldValue)}
    />

    <Content {...props} />
  </FormContainer>
);

export default Component;
