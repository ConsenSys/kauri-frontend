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

const TitleContainer = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`;

const handleConfirmAction = (confirmButtonAction: any) => () =>
  confirmButtonAction();

const AlertViewComponent: React.FunctionComponent<IProps> = props => (
  <section>
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
  </section>
);

export default AlertViewComponent;
