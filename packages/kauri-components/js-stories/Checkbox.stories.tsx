import React from "react";
import styled from "../lib/styled-components";
import { storiesOf } from "@storybook/react";
import Checkbox from "../components/Checkbox";

const Container = styled.div`
  display: flex;
  height: 40px;
  > :first-child {
    margin-top: 5px;
    margin-left: 5px;
  }
  background: #1f2428;
`;

storiesOf("Checkbox", module)
  .add("not checked and not disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={false}
        checked={false}
      />
    </Container>
  ))
  .add("checked and not disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={false}
        checked={true}
      />
    </Container>
  ))
  .add("not checked and disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={true}
        checked={false}
      />
    </Container>
  ))
  .add("checked and disabled", () => (
    <Container>
      <Checkbox
        label="email"
        onChange={() => alert("heuy")}
        disabled={true}
        checked={true}
      />
    </Container>
  ));
