import * as React from "react";
import styled from "../../lib/styled-components";
import { Input } from "../Input";

export const AddMemberSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.theme.space[3]}px 0px
    ${props => props.theme.space[3]}px 0px;
`;

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  emailAddress: string;
}

const Content: React.FunctionComponent<IProps> = ({
  handleChange,
  emailAddress,
}) => {
  return (
    <AddMemberSection>
      <Input
        onChange={handleChange}
        value={emailAddress}
        placeHolder="EMAIL ADDRESS"
        textAlign="center"
        color="textPrimary"
        fontSize={1}
        fontWeight={500}
      />
    </AddMemberSection>
  );
};

export default Content;
