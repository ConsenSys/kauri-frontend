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
  changeMemberRoleAction as changeMemberRole,
  resendInvitationAction as resendInvitation,
  sendCommunityInvitationAction as sendCommunityInvitation,
} from "../../Community/Module";
import { prepareChangeMemberRoleVariables } from "../../../../queries/__generated__/prepareChangeMemberRole";
import { openModalAction as openModal } from "../../../../../kauri-components/components/Modal/Module";
import AlertViewComponent from "../../../../../kauri-components/components/Modal/AlertView";
import ChangeMemberRoleModalContent from "./ChangeMemberRoleModalContent";

const ManageMembersContainer = styled.section`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;
interface IProps {
  userId: string;
  invitations: IInvitation[] | null;
  formInvitations?: IInvitation[] | null;
  members: Array<getCommunity_getCommunity_members | null> | null;
  openAddMemberModal: () => void;
  closeModalAction: () => void;
  removeMemberAction: typeof removeMember;
  revokeInvitationAction: typeof revokeInvitation;
  cancelInvitation: (payload: { index: number }) => void;
  id: string | null;
  data?: {
    getCommunityInvitations: { content: any };
  };
  isCommunityAdmin: boolean;
  openModalAction: typeof openModal;
  changeMemberRoleAction: typeof changeMemberRole;
  resendInvitationAction: typeof resendInvitation;
  sendCommunityInvitationAction: typeof sendCommunityInvitation;
}

interface IRole {
  role: string | null;
}

class ManageMembers extends React.Component<IProps, IRole> {
  state = {
    role: null,
  };

  openChangeMemberRoleModal = (payload: prepareChangeMemberRoleVariables) => {
    this.props.openModalAction({
      children: (
        <AlertViewComponent
          closeModalAction={() => this.props.closeModalAction()}
          confirmButtonAction={() => {
            this.props.changeMemberRoleAction({
              ...payload,
              role: this.state.role as any,
            });
          }}
          content={
            <ChangeMemberRoleModalContent
              handleMemberRoleChange={(role: string) => this.setState({ role })}
            />
          }
          title={"Change Member Role"}
        />
      ),
    });
  };

  render() {
    const props = this.props;

    if (Array.isArray(props.formInvitations)) {
      if (props.formInvitations.length >= 1) {
        return (
          <ManageMembersContainer>
            {props.members &&
              Array.isArray(props.members) &&
              props.members.length >= 1 && (
                <MembersPanel
                  openChangeMemberRoleModal={this.openChangeMemberRoleModal}
                  userId={props.userId}
                  isCommunityAdmin={props.isCommunityAdmin}
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
                resendInvitationAction={props.resendInvitationAction}
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
                  openChangeMemberRoleModal={this.openChangeMemberRoleModal}
                  userId={props.userId}
                  isCommunityAdmin={props.isCommunityAdmin}
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
                resendInvitationAction={props.resendInvitationAction}
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
          openChangeMemberRoleModal={this.openChangeMemberRoleModal}
          userId={props.userId}
          isCommunityAdmin={props.isCommunityAdmin}
          id={props.id}
          removeMemberAction={props.removeMemberAction}
          openAddMemberModal={() => props.openAddMemberModal()}
          members={props.members}
        />
        <InviteMembersPanel
          sendCommunityInvitationAction={props.sendCommunityInvitationAction}
          resendInvitationAction={props.resendInvitationAction}
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
  }
}

export default ManageMembers;
