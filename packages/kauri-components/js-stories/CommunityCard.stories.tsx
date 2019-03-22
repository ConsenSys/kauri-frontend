import React from "react";
import { storiesOf } from "@storybook/react";
import CommunityCard from "../components/Card/CommunityCard";
import styled from "../lib/styled-components";

const Container = styled.div`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

storiesOf("CommunityCard", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("Community Card No Image", () => (
    <CommunityCard
      cardHeight={310}
      logo={null}
      imageURL={null}
      linkComponent={null}
      name="Loom Network Loom Network Loom Network Loom Network"
      description={`
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
      `}
      articleCount="58"
      collectionCount="58"
    />
  ))
  .add("Community Card With Image", () => (
    <CommunityCard
      cardHeight={310}
      logo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
      imageURL={null}
      linkComponent={null}
      name="Loom Network"
      description={`
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
      `}
      articleCount="58"
      collectionCount="58"
    />
  ));
