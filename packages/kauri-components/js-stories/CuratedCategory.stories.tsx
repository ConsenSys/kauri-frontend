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
  .add("No Image", () => (
    <CuratedCategory
      background={null}
      category="Getting started"
      description={"Build your first dapp with Ethereum"}
      linkComponent={children => <Link>{children}</Link>}
    />
  ))
  .add("With Image", () => (
    <CuratedCategory
      background={
        "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80"
      }
      category="Getting started"
      description={"Build your first dapp with Ethereum"}
      linkComponent={children => <Link>{children}</Link>}
    />
  ));
