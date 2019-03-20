import React from "react";
import styled from "styled-components";
import {
  NavigationText,
  Label,
} from "../../../../kauri-components/components/Typography";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import ModalHeader from "../../../../kauri-components/components/Headers/ModalHeader";
import Input from "../../../../kauri-components/components/Input/Input";
import { IShowNotificationPayload } from "../../../lib/Module";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;
const Title = () => (
  <TitleContainer>
    <NavigationText>Advanced Settings</NavigationText>
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
        handleClose();
        handleConfirm();
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
  height: 200px;
  width: 600px;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

interface IProps {
  closeModalAction: () => void;
  confirmModal: (canonicalURL: string) => void;
  showNotificationAction: (payload: IShowNotificationPayload) => void;
}

interface IState {
  canonicalURL: string;
}

class AdvancedSettingsModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      canonicalURL: "",
    };
  }

  render() {
    const { closeModalAction, confirmModal } = this.props;
    return (
      <ContentContainer>
        <ModalHeader title={<Title />} />
        <Label>
          A canonical URL helps search engines give credit to the origin.
        </Label>
        <Input
          onChange={e => this.setState({ canonicalURL: e.target.value })}
          value={this.state.canonicalURL}
          color="textPrimary"
          placeHolder="Enter a canonical url"
          fontSize={3}
        />
        <Actions
          handleConfirm={
            this.state.canonicalURL.length > 0
              ? () => confirmModal(this.state.canonicalURL)
              : () =>
                  this.props.showNotificationAction({
                    description: "Please enter a canonical url",
                    message:
                      "A canonical URL helps search engines give credit to the origin.",
                    notificationType: "error",
                  })
          }
          handleClose={() => closeModalAction()}
        />
      </ContentContainer>
    );
  }
}

export default AdvancedSettingsModal;
