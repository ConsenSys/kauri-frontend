import React from "react";
import { storiesOf } from "@storybook/react";
import SearchCategory from "../components/SearchResults/SearchCategory";
import styled from "../lib/styled-components";

const Container = styled.section`
  display: flex;
  > div,
  section {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

storiesOf("SearchResults", module)
  .add("SearchCategory - active", () => (
    <Container>
      <SearchCategory active={true} category={"Articles"} amount={4} />
    </Container>
  ))
  .add("SearchCategory - inactive", () => (
    <Container>
      <SearchCategory active={false} category={"Collections"} amount={4} />
    </Container>
  ));
