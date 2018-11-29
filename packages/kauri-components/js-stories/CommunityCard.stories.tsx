import React from "react";
import { storiesOf } from "@storybook/react";
import CommunityCard from "../components/Card/CommunityCard";

storiesOf("CommunityCard", module)
  .add("Community Card No Image", () => (
    <CommunityCard
      cardHeight={310}
      communityLogo={null}
      linkComponent={null}
      communityName="Loom Network"
      communityDescription={`
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
      `}
      articles="58"
    />
  ))
  .add("Community Card With Image", () => (
    <CommunityCard
      cardHeight={310}
      linkComponent={null}
      communityName="Loom Network"
      communityDescription={`
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
        The Next-Generation Blockchain Application Platform for Ethereum.
      `}
      articles="58"
      communityLogo="https://pbs.twimg.com/profile_images/939416633419821057/AgqO1tTQ.jpg"
    />
  ));
