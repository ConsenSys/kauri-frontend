import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "../lib/styled-components";
import PublishYourOwnContentCTA from "../components/PublishYourOwnContentCTA";

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

storiesOf("PublishYourOwnContentCTA", module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add("Three buttons", () => (
    <PublishYourOwnContentCTA
      content={[
        {
          __typename: "StaticContentElementDTO",
          link: "https://dev.kauri.io/write-article",
          name: "Write Article",
        },
        {
          __typename: "StaticContentElementDTO",
          link: "https://dev.kauri.io/create-collection",
          name: "Create Collection",
        },
        {
          __typename: "StaticContentElementDTO",
          link: "https://import.dev.kauri.io",
          name: "Import Content",
        },
      ]}
      linkComponent={children => <Link>{children}</Link>}
    />
  ));
