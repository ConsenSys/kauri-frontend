import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import CuratedCategory from "../components/CuratedCategory";

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

storiesOf("CuratedCategory", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("Getting Started", () => (
    <CuratedCategory
      category="Getting started"
      description={"Build your first dapp with Ethereum"}
      linkComponent={children => <Link>{children}</Link>}
    />
  ));
