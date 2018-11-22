import * as React from "react";
import styled from "../../lib/styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  > :first-child {
    margin-right: auto;
  }
`;

interface IProps {
  title: React.ReactElement<any>;
  actions: React.ReactElement<any>;
}

const ModalHeaderComponent: React.SFC<IProps> = ({ title, actions }) => (
  <Container>
    {title}
    {actions}
  </Container>
);

export default ModalHeaderComponent;
