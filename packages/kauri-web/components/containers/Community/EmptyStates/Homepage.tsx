import * as React from "react";
import styled from "../../../../lib/styled-components";

const Container = styled.section``;

interface IProps {}

const CommunityHomepageEmptyState: React.FunctionComponent<IProps> = props => (
  <Container>
    <p>Show admin visible empty state here</p>
  </Container>
);

export default CommunityHomepageEmptyState;
