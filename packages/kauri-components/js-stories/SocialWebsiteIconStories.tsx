import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import SocialWebsiteIcon from "../components/PublicProfile/SocialWebsiteIcon";
import PersonalWebsite from "../components/PublicProfile/PersonalWebsite";

const SocialWebsites = styled.div`
  display: flex;
  margin-bottom: 20px;
  > * {
    margin-right: 5px;
  }
`;

storiesOf("SocialWebsiteIcon", module)
  .add("Github", () => (
    <SocialWebsiteIcon socialURL="https://github.com/rej156" brand="github" />
  ))
  .add("Twitter", () => (
    <SocialWebsiteIcon
      socialURL="https://twitter.com/ericjuta"
      brand="twitter"
    />
  ))
  .add("Linkedin with height prop", () => (
    <SocialWebsiteIcon
      socialURL="https://twitter.com/ericjuta"
      height={30}
      brand="linkedin"
    />
  ))
  .add("Social Websites", () => (
    <SocialWebsites>
      <SocialWebsiteIcon
        socialURL="https://twitter.com/ericjuta"
        brand="linkedin"
      />
      <SocialWebsiteIcon
        socialURL="https://twitter.com/ericjuta"
        brand="twitter"
      />
      <PersonalWebsite website="www.personalwebsite.com" />
    </SocialWebsites>
  ));
