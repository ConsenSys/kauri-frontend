import React from "react";
import AlertViewComponent from "../../../../kauri-components/components/Modal/AlertView";
import AddMemberModalContent from "../../../../kauri-components/components/CreateCommunityForm/AddMemberModalContent";

interface IProps {
  closeModalAction: () => void;
  confirmButtonAction: (
    payload: { emailAddress: string; role: string },
    closeModalAction: () => void
  ) => void;
}

interface IState {
  currentStep: number;
  emailAddress: string;
  role: string;
}

const AddMemberModal: React.FunctionComponent<IProps> = props => {
  const [state, setState] = React.useState<IState>({
    currentStep: 1,
    emailAddress: "",
    role: "",
  });

  const { currentStep, emailAddress, role } = state;

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "CURATOR", label: "MODERATOR" },
  ];

  return (
    <AlertViewComponent
      closeModalAction={() => props.closeModalAction()}
      confirmButtonAction={() => {
        props.confirmButtonAction(
          { emailAddress, role },
          props.closeModalAction
        );
      }}
      content={
        <AddMemberModalContent
          handleRoleChange={(chosenRole: string) =>
            setState({ ...state, role: chosenRole })
          }
          roles={roles}
          currentStep={currentStep}
          emailAddress={emailAddress}
          role={role}
          handleEmailChange={({ target: { value } }) =>
            setState({ currentStep, emailAddress: value, role })
          }
        />
      }
      title={"Invite New Moderator"}
    />
  );
};

export default AddMemberModal;
