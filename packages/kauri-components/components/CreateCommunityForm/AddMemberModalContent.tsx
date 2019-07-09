import * as React from "react";
import styled from "../../lib/styled-components";
import { Input } from "../Input";
import { BodyCard, Label } from "../Typography";
import Select, { TooltipContainer } from "../Select";
import Divider from "../Divider";

export const AddMemberSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.space[3]}px 0px
    ${props => props.theme.space[3]}px 0px;
`;

interface IProps {
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  handleRoleChange: (role: string) => any;
  email: string;
  currentStep: number;
  role: string;
  roles: Array<{ value: string; label: string }>;
}
const { Fragment } = React;

const StepOneContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(3) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

export const ChooseRoleOptions: React.FunctionComponent<{
  roles: Array<{ value: string; label: string }>;
  handleRoleChange: (role: string) => void;
}> = ({ roles, handleRoleChange }) => (
  <TooltipContainer>
    {roles.map((role, index) =>
      roles.length - 1 === index ? (
        <Label onClick={() => handleRoleChange(role.value)}>{role.label}</Label>
      ) : (
        <Fragment>
          <Label key={role.value} onClick={() => handleRoleChange(role.value)}>
            {role.label}
          </Label>
          <Divider key={`${role.value}-divider`} />
        </Fragment>
      )
    )}
  </TooltipContainer>
);

const AddMemberModalContent: React.FunctionComponent<IProps> = ({
  handleEmailChange,
  handleRoleChange,
  email,
  currentStep,
  role,
  roles,
}) => {
  return (
    <AddMemberSection>
      {currentStep === 1 && (
        <StepOneContainer>
          <BodyCard>
            Enter the potential moderator or admin’s email address to invite
            them to join!
          </BodyCard>
          <Input
            onChange={handleEmailChange}
            value={email}
            placeHolder="EMAIL ADDRESS"
            textAlign="center"
            color="textPrimary"
            fontSize={1}
            fontWeight={500}
          />
          <Select value={role} placeHolder="Choose Role">
            <ChooseRoleOptions
              handleRoleChange={handleRoleChange}
              roles={roles}
            />
          </Select>
        </StepOneContainer>
      )}
      {currentStep === 2 && (
        <Fragment>
          <BodyCard>Moderator as been added and now pending.</BodyCard>
          <BodyCard>
            You can manage all the moderators from the Manage tab.
          </BodyCard>
        </Fragment>
      )}
    </AddMemberSection>
  );
};

export default AddMemberModalContent;
