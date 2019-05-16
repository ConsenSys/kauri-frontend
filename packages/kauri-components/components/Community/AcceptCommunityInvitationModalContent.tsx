import * as React from "react";
import styled from "../../lib/styled-components";
import { BodyCard } from "../Typography";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  width: 330px;
  margin-top: ${props => props.theme.space[2]}px;
  margin-bottom: ${props => props.theme.space[3]}px;
`;

const AcceptCommunityInvitationModalContent: React.FunctionComponent = () => (
  <Container>
    <BodyCard>
      You’ve been invited to join this community as a moderator!
    </BodyCard>
    <BodyCard>
      By accepting, you can add new articles and collections to this community,
      update existing content, and modify the community home page.
    </BodyCard>
  </Container>
);

export default AcceptCommunityInvitationModalContent;
