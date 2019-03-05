import * as React from "react";
import styled from "../../../lib/styled-components";
import Actions from "./CreateCommunityFormActions";
import Header from "./CreateCommunityFormHeader";
import Content from "./CreateCommunityFormContent";
import { routeChangeAction } from "../../../lib/Module";
import { InjectedFormikProps } from "formik";

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export interface IProps {
  routeChangeAction: typeof routeChangeAction;
}

const Component: React.SFC<InjectedFormikProps<IProps, {}>> = props => (
  <FormContainer>
    <Actions
      goBack={() => props.routeChangeAction(`back`)}
      setupImageUploader={() => {
        return;
      }}
      createCommunityAction={() => {
        return;
      }}
    />
    <Header
      uploadLogo={() => {
        return;
      }}
    />
    <Content />
  </FormContainer>
);

export default Component;
