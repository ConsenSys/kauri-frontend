import React from "react";
import { storiesOf } from "@storybook/react";
import FeaturedContent from "../components/FeaturedContent";
import styled from "../lib/styled-components";
import { UserAgentProvider } from "@quentin-sommer/react-useragent";
import moment from "moment";

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

const resource: any = {
  attributes: {
    background:
      "https://images.unsplash.com/photo-1532562327126-3fac59f74a62?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0401fb7403da3c3224101c11cb34969b&auto=format&fit=crop&w=1268&q=80",
  },
  date: moment(1538734619928).format("D MMM YYYY"),
  description: "This is the description to my next song",
  id: "1234567890",
  linkComponent: (children: React.ReactElement<any>) => <Link>{children}</Link>,
  ownerType: "USER",
  resourceIdentifier: {
    type: "ARTICLE",
  },
  tags: ["hey", "i", "love", "you"],
  title: "Resource title goes here yo",
  userAvatar: null,
  userId: "1234567890",
  username: "rej156",
  version: 1,
};

storiesOf("FeaturedContent", module).add("full width", () => (
  <UserAgentProvider ua={window.navigator.userAgent}>
    <FeaturedContent
      content={[resource, { ...resource, attributes: {} }, resource]}
      Link={Link}
    />
  </UserAgentProvider>
));
