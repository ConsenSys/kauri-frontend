import React from "react";
import { storiesOf } from "@storybook/react";
import FeaturedResource from "../components/FeaturedResource";
import styled from "../lib/styled-components";

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    color: ${props => props.theme.colors.hoverTextColor} !important;
    > * {
      color: ${props => props.theme.colors.hoverTextColor} !important;
      > * {
        color: ${props => props.theme.colors.hoverTextColor} !important;
        > * {
          color: ${props => props.theme.colors.hoverTextColor} !important;
        }
      }
    }
  }
`;

storiesOf("FeaturedResource", module).add("full stack dapp", () => (
  <FeaturedResource
    id="1234567890"
    version="1234567890"
    linkComponent={children => <Link>{children}</Link>}
    title="Full stack dApp Tutorial Series"
    description="Series of articles and tutorials aimed at experienced software engineers, introducing the web3 tech stack and available resources. Culminating in building your first dApp (decentralised application)"
    tags={["lol", "lol", "lol", "lol", "lol", "lol"]}
    resourceType={"collection"}
    ownerResourceType={"collection"}
    userId={"rej156"}
    username={"rej156"}
    avatar={
      "https://images.unsplash.com/photo-1548606056-2093f8c13714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    }
  />
));
