import React from "react";
import AlertViewComponent from "../../../../kauri-components/components/Modal/AlertView";
import AddMemberModalContent from "../../../../kauri-components/components/CreateCommunityForm/AddMemberModalContent";

interface IProps {
  closeModalAction: () => void;
  confirmButtonAction: (
    payload: { email: string; role: string },
    closeModalAction: () => void
  ) => void;
}

export interface IRole {
  value: string;
  label: string;
}

export const roles: IRole[] = [
  { value: "ADMIN", label: "ADMIN" },
  { value: "CURATOR", label: "MODERATOR" },
];

interface IState {
  currentStep: number;
  email: string;
  role: string;
}

const AddMemberModal: React.FunctionComponent<IProps> = props => {
  const [state, setState] = React.useState<IState>({
    currentStep: 1,
    email: "",
    role: "",
  });

  const { currentStep, email, role } = state;

  const chosenRole = roles.filter(
    hardcodedRoles => hardcodedRoles.value === state.role
  ).length
    ? roles.filter(hardcodedRoles => hardcodedRoles.value === state.role)[0]
        .label
    : role;

  return (
    <AlertViewComponent
      closeModalAction={() => props.closeModalAction()}
      confirmButtonAction={() => {
        props.confirmButtonAction({ email, role }, props.closeModalAction);
      }}
      content={
        <AddMemberModalContent
          handleRoleChange={(chosenRole: string) =>
            setState({ ...state, role: chosenRole })
          }
          roles={roles}
          currentStep={currentStep}
          email={email}
          role={chosenRole}
          handleEmailChange={({ target: { value } }) =>
            setState({ currentStep, email: value, role })
          }
        />
      }
      title={"Invite New Moderator"}
    />
  );
};

export default AddMemberModal;
