import * as React from "react";
import styled from "../../../lib/styled-components";
import Actions from "./CreateCommunityFormActions";
import Header from "./CreateCommunityFormHeader";
import Content from "./CreateCommunityFormContent";
import { routeChangeAction } from "../../../lib/Module";

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  routeChangeAction: typeof routeChangeAction;
}

const Component: React.SFC<IProps> = props => (
  <FormContainer>
    <Actions
      goBack={() => props.routeChangeAction(`back`)}
      setupImageUploader={() => {
        return;
      }}
      createCommunity={() => {
        return;
      }}
    />
    <Header />
    <Content />
  </FormContainer>
);

export default Component;
