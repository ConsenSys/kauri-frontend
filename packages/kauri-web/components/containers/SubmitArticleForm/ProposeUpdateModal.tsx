import React from "react";
import styled from "styled-components";
import {
  NavigationText,
  BodyCard,
} from "../../../../kauri-components/components/Typography";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import ModalHeader from "../../../../kauri-components/components/Headers/ModalHeader";
import Input from "../../../../kauri-components/components/Input/Input";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;
const Title = ({ text }: { text: string }) => (
  <TitleContainer>
    <NavigationText>Submit Update</NavigationText>
    <BodyCard>{text}</BodyCard>
  </TitleContainer>
);

const ActionsContainer = styled.div`
  display: flex;
  align-self: flex-end;

  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const CloseIcon = () => (
  <img
    style={{ rotate: "45deg" }}
    src="https://png.icons8.com/material-two-tone/50/000000/delete-sign.png"
  />
);

const Actions = ({
  handleClose,
  handleConfirm,
}: {
  handleClose: any;
  handleConfirm: any;
}) => (
  <ActionsContainer>
    <TertiaryButton
      icon={<CloseIcon />}
      onClick={() => handleClose()}
      color="textPrimary"
    >
      Close
    </TertiaryButton>
    <PrimaryButton
      onClick={() => {
        handleConfirm();
        handleClose();
      }}
    >
      Confirm
    </PrimaryButton>
  </ActionsContainer>
);

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
  width: 600px;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

interface IProps {
  closeModalAction: () => void;
  confirmModal: (cause: string) => void;
}

interface IState {
  updateComment: string;
}

class ProposeArticleModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      updateComment: "",
    };
  }

  render() {
    const { closeModalAction, confirmModal } = this.props;

    return (
      <ContentContainer>
        <ModalHeader
          title={
            <Title text="Please enter a note to the author explaining your changes. At a minimum, describe what you've changed. Adding detail will greatly increase the likelihood the author will accept and publish your proposed update!" />
          }
        />
        <Input
          onChange={e => this.setState({ updateComment: e.target.value })}
          value={this.state.updateComment}
          color="textPrimary"
          placeHolder="Please describe your changes"
          fontSize={4}
        />
        <Actions
          handleConfirm={() => confirmModal(this.state.updateComment)}
          handleClose={() => closeModalAction()}
        />
      </ContentContainer>
    );
  }
}

export default ProposeArticleModal;
