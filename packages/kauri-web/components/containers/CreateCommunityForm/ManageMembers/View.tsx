import * as React from "react";
import ManageMemberEmptyState from "../../../../../kauri-components/components/Community/ManageMemberEmptyState";
import { getCommunity_getCommunity_members } from "../../../../queries/__generated__/getCommunity";
import MembersPanel from "./MembersPanel";
import InviteMembersPanel from "./InviteMembersPanel";
import styled from "../../../../lib/styled-components";

interface IProps {
  invitations: Array<{
    email: string;
    role: string;
  } | null> | null;
  members: Array<getCommunity_getCommunity_members | null> | null;
  openAddMemberModal: () => void;
  removeMemberAction: () => void;
  revokeInvitationAction: () => void;
  id: string | null;
  data: {
    getCommunityInvitations: { content: any };
  };
}

const ManageMembersContainer = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const ManageMembers: React.FunctionComponent<IProps> = props => {
  // console.log(props.members);
  return props.members &&
    Array.isArray(props.members) &&
    props.members.length === 1 ? (
    <ManageMembersContainer>
      <MembersPanel
        removeMemberAction={props.removeMemberAction}
        openAddMemberModal={() => props.openAddMemberModal()}
        members={props.members}
      />
      <InviteMembersPanel
        revokeInvitationAction={props.revokeInvitationAction}
        invitations={
          props.data.getCommunityInvitations.content || props.invitations
        }
      />
    </ManageMembersContainer>
  ) : (
    <ManageMemberEmptyState handleClick={() => props.openAddMemberModal()} />
  );
};

export default ManageMembers;
