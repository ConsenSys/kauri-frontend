import * as React from "react";
import { Title2 } from "../Typography";
import styled from "../../lib/styled-components";
import PrimaryButton from "../Button/PrimaryButton";
import TertiaryButton from "../Button/TertiaryButton";

interface IProps {
  title: string;
  content: React.ReactElement<any>;
  confirmButtonText?: string;
  closeButtonText?: string;
  confirmButtonAction: any;
  closeModalAction: () => void;
  hideCloseButton?: boolean;
  hideConfirmButton?: boolean;
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
  justify-content: space-between;
  width: 100%;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`;

const handleConfirmAction = (confirmButtonAction: any) => () => {
  confirmButtonAction();
}

const AlertViewComponent: React.FunctionComponent<IProps> = props => (
  <Container>
    <TitleContainer>
      <Title2>{props.title}</Title2>
    </TitleContainer>
    {props.content}
    <Footer>
      {!props.hideCloseButton && <TertiaryButton
        color={"textPrimary"}
        onClick={handleConfirmAction(props.closeModalAction)}
      >
        {props.closeButtonText || "Cancel"}
      </TertiaryButton>}
      {!props.hideConfirmButton && <PrimaryButton onClick={handleConfirmAction(props.confirmButtonAction)}>
        {props.confirmButtonText || "Confirm"}
      </PrimaryButton>}
    </Footer>
  </Container>
);

export default AlertViewComponent;
