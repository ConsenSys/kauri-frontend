import React from "react";
import AlertViewComponent from "../../../../kauri-components/components/Modal/AlertView";
import AddMemberModalContent from "../../../../kauri-components/components/CreateCommunityForm/AddMemberModalContent";

interface IProps {
  closeModalAction: () => void;
  confirmButtonAction: (
    emailAddress: string,
    closeModalAction: () => void
  ) => void;
}

interface IState {
  currentStep: number;
  emailAddress: string;
}

const AddMemberModal: React.FunctionComponent<IProps> = props => {
  const [{ currentStep, emailAddress }, setState] = React.useState<IState>({
    currentStep: 1,
    emailAddress: "",
  });

  return (
    <AlertViewComponent
      closeModalAction={() => props.closeModalAction()}
      confirmButtonAction={() => {
        props.confirmButtonAction(emailAddress, props.closeModalAction);
      }}
      content={
        <AddMemberModalContent
          currentStep={currentStep}
          emailAddress={emailAddress}
          handleChange={({ target: { value } }) =>
            setState({ currentStep, emailAddress: value })
          }
        />
      }
      title={"Add Member to Community"}
    />
  );
};

export default AddMemberModal;
