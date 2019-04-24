import * as React from "react";
import styled from "../../lib/styled-components";
import { Input } from "../Input";
import { BodyCard } from "../Typography";

export const AddMemberSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.space[3]}px 0px
    ${props => props.theme.space[3]}px 0px;
`;

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  emailAddress: string;
  currentStep: number;
}
const { Fragment } = React;

const Content: React.FunctionComponent<IProps> = ({
  handleChange,
  emailAddress,
  currentStep,
}) => {
  return (
    <AddMemberSection>
      {currentStep === 1 && (
        <Input
          onChange={handleChange}
          value={emailAddress}
          placeHolder="EMAIL ADDRESS"
          textAlign="center"
          color="textPrimary"
          fontSize={1}
          fontWeight={500}
        />
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

export default Content;
