import React from "react";
import styled from "../lib/styled-components";
import { storiesOf } from "@storybook/react";
import CommunityProfile from "../components/Community/CommunityProfile";

const DummyContainer = styled.div`
  width: 120px;
`;

storiesOf("Community Profile", module).add("MetaMask", () => (
  <DummyContainer>
    <CommunityProfile
      id="1234567890"
      hostName="beta.kauri.io"
      avatar="https://api.dev2.kauri.io:443/ipfs/QmYy86Xyt4KgJDjZysYP4snuR9aTxXYFkPd9DpB4b3sjMz"
      name="metamask"
      website="https://metamask.io"
    />
  </DummyContainer>
));
