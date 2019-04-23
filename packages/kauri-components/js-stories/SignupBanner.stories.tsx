import React from "react";
import { storiesOf } from "@storybook/react";
import SignupBanner from "../components/SignupBanner";
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

storiesOf("SignupBanner", module).add("full width", () => (
  <SignupBanner linkComponent={children => <Link>{children}</Link>} />
));
