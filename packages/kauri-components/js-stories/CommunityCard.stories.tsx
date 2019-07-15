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

const linkComponent = (childrenProps: React.ReactElement<any>) => (
  <Link href={"lol"}>{childrenProps}</Link>
);

storiesOf("CommunityCard", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("Community Card No Image", () => (
    <CommunityCard
      cardHeight={310}
      logo={null}
      imageURL={null}
      linkComponent={linkComponent}
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
      linkComponent={linkComponent}
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
