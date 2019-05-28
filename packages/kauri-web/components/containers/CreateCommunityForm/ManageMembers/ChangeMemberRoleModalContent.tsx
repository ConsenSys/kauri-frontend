import * as React from "react";
import styled from "../../../../lib/styled-components";
import Select from "../../../../../kauri-components/components/Select";
import { ChooseRoleOptions } from "../../../../../kauri-components/components/CreateCommunityForm/AddMemberModalContent";
import { roles, IRole } from "../AddMemberModal";
import R from "ramda";

export const ChangeMemberRoleModalContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.space[3]}px 0px
    ${props => props.theme.space[3]}px 0px;
`;

interface IProps {
  handleMemberRoleChange: (role: string) => void;
}

const ChangeMemberRoleModalContent: React.FunctionComponent<IProps> = props => {
  const [state, setRole] = React.useState<{ role: string | null }>({
    role: null,
  });

  const chosenRole =
    typeof state.role === "string"
      ? R.pipe(
          R.find<IRole>(role => role.value === state.role),
          R.path<string>(["label"])
        )(roles)
      : state.role;
  return (
    <ChangeMemberRoleModalContainer>
      <Select value={chosenRole} placeHolder={"Choose Role"}>
        <ChooseRoleOptions
          roles={roles}
          handleRoleChange={(role: string) => {
            props.handleMemberRoleChange(role);
            setRole({ role });
          }}
        />
      </Select>
    </ChangeMemberRoleModalContainer>
  );
};

export default ChangeMemberRoleModalContent;
