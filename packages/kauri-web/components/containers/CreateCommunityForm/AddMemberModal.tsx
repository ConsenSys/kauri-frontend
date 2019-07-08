import React from "react";
import AlertViewComponent from "../../../../kauri-components/components/Modal/AlertView";
import AddMemberModalContent from "../../../../kauri-components/components/CreateCommunityForm/AddMemberModalContent";
import { showNotificationAction as showNotification } from "../../../lib/Module";
import * as Yup from "yup";

interface IProps {
  closeModalAction: () => void;
  confirmButtonAction: (
    payload: { email: string; role: string },
    closeModalAction: () => void
  ) => void;
  showNotificationAction: typeof showNotification;
  currentMemberAndInvitationEmails: string[];
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
        const emailCheck = Yup.string().email();
        const validEmail = emailCheck.isValidSync(email);
        if (typeof email === "string" && !validEmail) {
          return props.showNotificationAction({
            description:
              "Please enter a valid email address to send the member invitation to!",
            message: "Email required",
            notificationType: "error",
          });
        }
        if (typeof chosenRole === "string" && !chosenRole.length) {
          return props.showNotificationAction({
            description: "Please choose a role for the new proposed member!",
            message: "Role required",
            notificationType: "error",
          });
        }
        return props.confirmButtonAction(
          { email, role },
          props.closeModalAction
        );
      }}
      content={
        <AddMemberModalContent
          handleRoleChange={(selectedRole: string) =>
            setState({ ...state, role: selectedRole })
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
