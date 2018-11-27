import * as React from "react";
import { Title2 } from "../Typography";
import styled from "../../lib/styled-components";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";

interface IProps {
  title: string;
  content: React.ReactElement<any>;
  confirmButtonAction: (payload: any) => void;
  closeModalAction: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 120px;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  > * {
    text-align: center;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  align-self: center;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`;

const handleConfirmAction = (confirmButtonAction: any) => () =>
  confirmButtonAction();

const AlertViewComponent: React.FunctionComponent<IProps> = props => (
  <Container>
    <TitleContainer>
      <Title2>{props.title}</Title2>
    </TitleContainer>
    {props.content}
    <Footer>
      <SecondaryButton
        color={"textPrimary"}
        border={"primary"}
        onClick={handleConfirmAction(props.closeModalAction)}
      >
        Cancel
      </SecondaryButton>
      <PrimaryButton onClick={handleConfirmAction(props.confirmButtonAction)}>
        Confirm
      </PrimaryButton>
    </Footer>
  </Container>
);

export default AlertViewComponent;
