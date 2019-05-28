import * as React from "react";
import styled from "../../../../lib/styled-components";

const Container = styled.section``;

interface IProps {
  role: string | null;
  handleMemberRoleChange: (role: string) => void;
}

const ChangeMemberRoleModalContent: React.FunctionComponent<IProps> = props => (
  <Container>hello world</Container>
  // Select dropdown todo
);

export default ChangeMemberRoleModalContent;
