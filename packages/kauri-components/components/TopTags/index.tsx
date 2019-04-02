import * as React from "react";
import styled from "../../lib/styled-components";
import { Title2 } from "../Typography";
import TagList from "../Tags/TagList";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > * > *:nth-child(n + 6) {
    display: none;
  }
`;

const TopTags: React.FunctionComponent<{ tags: string[] }> = ({ tags }) => (
  <Container>
    <Title2>Top Tags</Title2>
    <TagList
      color="textPrimary"
      orientation={"vertical"}
      tags={tags}
      maxTags={5}
    />
  </Container>
);

export default TopTags;
