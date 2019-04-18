import React from "react";
import { storiesOf } from "@storybook/react";
import TopContributors from "../components/TopContributors";
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

storiesOf("TopContributors", module).add("Default", () => (
  <TopContributors
    linkComponent={children => <Link>{children}</Link>}
    contributors={[
      {
        avatar: null,
        userId: "bfecec47dd8bf5f6264a9830a9d26ef387c38a67",
        username: null,
      },
      {
        avatar: null,
        userId: "bfecec47dd8bf5f6264a9830a9d26ef387c38a67",
        username: "rej156",
      },
      {
        avatar:
          "https://images.unsplash.com/photo-1548606056-2093f8c13714?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        userId: "bfecec47dd8bf5f6264a9830a9d26ef387c38a67",
        username: "rej156",
      },
    ]}
  />
));
