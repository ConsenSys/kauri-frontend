import styled from "styled-components";
import {
  Title2,
  BodyCard,
} from "../../../../../kauri-components/components/Typography";
import PrimaryButton from "../../../../../kauri-components/components/Button/PrimaryButton";
import { getCommunity_getCommunity_members } from "../../../../queries/__generated__/getCommunity";

const Container = styled.div`
  margin-left: ${props => props.theme.space[3]}px;
  background: white;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: ${props => props.theme.space[3]}px;
  & > button {
    margin: auto;
  }
`;

interface IProps {
  members: Array<getCommunity_getCommunity_members | null> | null;
}

const ManageModerators = ({ members }: IProps) => (
  <Container>
    <Title2>Moderators</Title2>
    {members && Array.isArray(members) && members.length === 1 && (
      <BodyCard>
        Moderators can add articles and collections to the community, as well as
        edit and remove existing ones.
      </BodyCard>
    )}
    <PrimaryButton text="Invite Moderator" />
  </Container>
);

export default ManageModerators;
