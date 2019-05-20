import * as React from "react";
import ManageMemberEmptyState from "../../../../../kauri-components/components/Community/ManageMemberEmptyState";
import { getCommunity_getCommunity_members } from "../../../../queries/__generated__/getCommunity";
import MembersPanel from "./MembersPanel";

interface IProps {
  members: Array<getCommunity_getCommunity_members | null> | null;
  openAddMemberModal: () => void;
}

const ManageMembers: React.FunctionComponent<IProps> = props => {
  console.log(props.members);
  return props.members &&
    Array.isArray(props.members) &&
    props.members.length === 1 ? (
    <MembersPanel
      openAddMemberModal={() => props.openAddMemberModal()}
      members={props.members}
    />
  ) : (
    <ManageMemberEmptyState handleClick={() => props.openAddMemberModal()} />
  );
};

export default ManageMembers;
