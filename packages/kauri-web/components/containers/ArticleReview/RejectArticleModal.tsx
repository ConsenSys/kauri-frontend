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
    <NavigationText>Reject Article</NavigationText>
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
  rejectionCause: string;
}

class RejectArticleModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      rejectionCause: "",
    };
  }

  render() {
    const { closeModalAction, confirmModal } = this.props;

    return (
      <ContentContainer>
        <ModalHeader
          title={
            <Title text="Let the contributor know why the article is been rejected. So they can improve the content and submit a corrected version." />
          }
        />
        <Input
          onChange={e => this.setState({ rejectionCause: e.target.value })}
          value={this.state.rejectionCause}
          color="textPrimary"
          placeHolder="Add feedback for the contributor"
          fontSize={4}
        />
        <Actions
          handleConfirm={() => confirmModal(this.state.rejectionCause)}
          handleClose={() => closeModalAction()}
        />
      </ContentContainer>
    );
  }
}

export default RejectArticleModal;
