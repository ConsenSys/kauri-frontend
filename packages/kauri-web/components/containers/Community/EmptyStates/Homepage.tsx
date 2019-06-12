import * as React from "react";
import styled from "../../../../lib/styled-components";
import { routeChangeAction } from "../../../../lib/Module";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: ${props => props.theme.space[3]}px;
  height: 100%;
  & > svg {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  id: string;
  routeChangeAction: typeof routeChangeAction;
}

const CommunityHomepageEmptyState: React.FunctionComponent<IProps> = props => (
  <Container>
    <p
      onClick={() =>
        props.routeChangeAction(`/community/${props.id}/update-community`)
      }
    >
      Show admin visible empty state here
    </p>
  </Container>
);

export default CommunityHomepageEmptyState;
