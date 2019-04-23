/* tslint:disable */
import React from "react";
import { storiesOf } from "@storybook/react";
import { TagInput, TagSelector, TagList } from "../components/Tags";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  background: #1e2428;
`;

storiesOf("Tags", module)
  .add("TagInput", () => (
    <Container>
      <TagInput
        removeLastTag={() => {}}
        handleEnterKey={val => console.log(val)}
        onSelect={e => console.log(e)}
        availableTags={[
          { tag: "Ethereum", count: 3000 },
          { tag: "Metamask", count: 450 },
          { tag: "MakerDao", count: 2500 },
          { tag: "Kauri", count: 7842 },
        ]}
      />
    </Container>
  ))
  .add("TagSelector", () => (
    <Container>
      <TagSelector
        tags={["Ethereun", "Web3"]}
        fetchMatches={() => {}}
        onChange={e => console.log("Searching for", e)}
        availableTags={[
          { tag: "Ethereum", count: 3000 },
          { tag: "Metamask", count: 450 },
          { tag: "MakerDao", count: 2500 },
          { tag: "Kauri", count: 7842 },
        ]}
        maxTags={5}
      />
    </Container>
  ))
  .add("Tags - Vertical Orientation", () => (
    <TagList
      color="textPrimary"
      orientation={"vertical"}
      tags={["Ethereun", "Web3"]}
      maxTags={5}
    />
  ));
