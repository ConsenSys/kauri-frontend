import React from "react";
import { storiesOf } from "@storybook/react";
import CommunityAvatar from "../components/Community/CommunityAvatar";

storiesOf("Community Avatar", module)
  .add("MetaMask", () => (
    <CommunityAvatar avatar="https://api.dev2.kauri.io:443/ipfs/QmYy86Xyt4KgJDjZysYP4snuR9aTxXYFkPd9DpB4b3sjMz" />
  ))
  .add("MakerDAO", () => (
    <CommunityAvatar avatar="https://api.dev2.kauri.io/ipfs/QmPcuAZuSV4ZWYkrkbaxnRw7K2pzSKZP2WmYZKyP48uWAb" />
  ));
