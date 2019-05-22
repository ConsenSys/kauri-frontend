import * as React from "react";
import ManageMemberEmptyState from "../../../../../kauri-components/components/Community/ManageMemberEmptyState";
import { getCommunity_getCommunity_members } from "../../../../queries/__generated__/getCommunity";
import MembersPanel from "./MembersPanel";
import InviteMembersPanel from "./InviteMembersPanel";
import FormInviteMembersPanel, { IInvitation } from "./FormInviteMembersPanel";
import styled from "../../../../lib/styled-components";
import {
  revokeInvitationAction as revokeInvitation,
  removeMemberAction as removeMember,
} from "../../Community/Module";

const ManageMembersContainer = styled.section`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;
interface IProps {
  invitations: IInvitation[] | null;
  formInvitations?: IInvitation[] | null;
  members: Array<getCommunity_getCommunity_members | null> | null;
  openAddMemberModal: () => void;
  removeMemberAction: typeof removeMember;
  revokeInvitationAction: typeof revokeInvitation;
  cancelInvitation: (payload: { index: number }) => void;
  id: string | null;
  data?: {
    getCommunityInvitations: { content: any };
  };
}

const ManageMembers: React.FunctionComponent<IProps> = props => {
  if (Array.isArray(props.formInvitations)) {
    if (props.formInvitations.length >= 1) {
      return (
        <ManageMembersContainer>
          {props.members &&
            Array.isArray(props.members) &&
            props.members.length >= 1 && (
              <MembersPanel
                id={props.id}
                removeMemberAction={props.removeMemberAction}
                openAddMemberModal={() => props.openAddMemberModal()}
                members={props.members}
              />
            )}
          {((props.data && props.data.getCommunityInvitations.content) ||
            (props.invitations &&
              Array.isArray(props.invitations) &&
              props.invitations.length >= 1)) && (
            <InviteMembersPanel
              id={props.id}
              revokeInvitationAction={props.revokeInvitationAction}
              invitations={
                (props.data && props.data.getCommunityInvitations.content) ||
                props.invitations
              }
            />
          )}
          {props.formInvitations.length >= 1 && (
            <FormInviteMembersPanel
              cancelInvitation={props.cancelInvitation}
              formInvitations={props.formInvitations}
            />
          )}
        </ManageMembersContainer>
      );
    }
  }
  if (
    (props.data && props.data.getCommunityInvitations.content) ||
    Array.isArray(props.invitations)
  ) {
    if (
      (props.data && props.data.getCommunityInvitations.content) ||
      (Array.isArray(props.invitations) && props.invitations.length >= 1)
    ) {
      return (
        <ManageMembersContainer>
          {props.members &&
            Array.isArray(props.members) &&
            props.members.length >= 1 && (
              <MembersPanel
                id={props.id}
                removeMemberAction={props.removeMemberAction}
                openAddMemberModal={() => props.openAddMemberModal()}
                members={props.members}
              />
            )}
          {((props.data && props.data.getCommunityInvitations.content) ||
            (props.invitations &&
              Array.isArray(props.invitations) &&
              props.invitations.length >= 1)) && (
            <InviteMembersPanel
              id={props.id}
              revokeInvitationAction={props.revokeInvitationAction}
              invitations={
                (props.data && props.data.getCommunityInvitations.content) ||
                props.invitations
              }
            />
          )}
          {props.formInvitations && props.formInvitations.length >= 1 && (
            <FormInviteMembersPanel
              cancelInvitation={props.cancelInvitation}
              formInvitations={props.formInvitations}
            />
          )}
        </ManageMembersContainer>
      );
    }
  }
  // console.log(props.members);
  return props.members &&
    Array.isArray(props.members) &&
    props.members.length >= 1 ? (
    <ManageMembersContainer>
      <MembersPanel
        id={props.id}
        removeMemberAction={props.removeMemberAction}
        openAddMemberModal={() => props.openAddMemberModal()}
        members={props.members}
      />
      <InviteMembersPanel
        id={props.id}
        revokeInvitationAction={props.revokeInvitationAction}
        invitations={
          (props.data && props.data.getCommunityInvitations.content) ||
          props.invitations
        }
      />
    </ManageMembersContainer>
  ) : (
    <ManageMemberEmptyState handleClick={() => props.openAddMemberModal()} />
  );
};

export default ManageMembers;
